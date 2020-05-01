package com.example.microservice2;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/orders")
public class OrderController {

    GuitarService guitarService;
    OrderService orderService;
    OrderGuitarService orderGuitarService;

    public OrderController(){

    }
    public OrderController(GuitarService guitarService, OrderService orderService, OrderGuitarService orderGuitarService) {
        this.guitarService = guitarService;
        this.orderService = orderService;
        this.orderGuitarService = orderGuitarService;
    }

    //@HystrixCommand(fallbackMethod = "defaultMessage")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public @NotNull Iterable<Order> list() {
        return this.orderService.getAllOrders();
    }


    //@HystrixCommand(fallbackMethod = "defaultMessage")
    @PostMapping
    public ResponseEntity<Order> create(@RequestBody OrderForm form) {
        List<OrderGuitarDto> formDtos = form.getGuitarOrders();
        validateGuitarsExistence(formDtos);
        Order order = new Order();
        order.setStatus(OrderStatus.PAID.name());
        order = this.orderService.create(order);

        List<OrderGuitar> orderGuitars = new ArrayList<>();
        for (OrderGuitarDto dto : formDtos) {
            orderGuitars.add(orderGuitarService.create(new OrderGuitar(order, guitarService.getGuitar(dto
                    .getGuitar()
                    .getId()), dto.getQuantity())));
        }

        order.setOrderGuitars(orderGuitars);

        this.orderService.update(order);

        String uri = ServletUriComponentsBuilder
                .fromCurrentServletMapping()
                .path("/orders/{id}")
                .buildAndExpand(order.getId())
                .toString();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", uri);

        return new ResponseEntity<>(order, headers, HttpStatus.CREATED);
    }

    private void validateGuitarsExistence(List<OrderGuitarDto> orderGuitars) {
        System.out.println("il rentre dans validateGuitarsExistence");
        List<OrderGuitarDto> list = orderGuitars
                .stream()
                .filter(op -> Objects.isNull(guitarService.getGuitar(op
                        .getGuitar()
                        .getId())))
                .collect(Collectors.toList());

        if (!CollectionUtils.isEmpty(list)) {
            new ResourceNotFoundException("Guitar not found");
        }
    }

    public String defaultMessage() {
        return "Circuit breaker here !!";
    }

    public static class OrderForm {

        private List<OrderGuitarDto> guitarOrders;

        public List<OrderGuitarDto> getGuitarOrders() {
            return guitarOrders;
        }

        public void setGuitarOrders(List<OrderGuitarDto> guitarOrders) {
            this.guitarOrders = guitarOrders;
        }
    }
}
