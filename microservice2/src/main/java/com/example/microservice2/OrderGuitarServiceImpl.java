package com.example.microservice2;

public class OrderGuitarServiceImpl implements OrderGuitarService{
    private OrderGuitarRepository orderGuitarRepository;

    public OrderGuitarServiceImpl(OrderGuitarRepository orderGuitarRepository) {
        this.orderGuitarRepository = orderGuitarRepository;
    }

    @Override
    public OrderGuitar create(OrderGuitar orderGuitar) {
        return this.orderGuitarRepository.save(orderGuitar);
    }
}
