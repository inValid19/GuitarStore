package com.example.webservice1;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "users")
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //@HystrixCommand(fallbackMethod = "defaultMessage")
    @GetMapping("/get")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    //@HystrixCommand(fallbackMethod = "defaultMessage")
    @GetMapping(produces = "application/json")
    @RequestMapping({ "/validateLogin" })
    public UserAuth validateLogin() {
        return new UserAuth("User successfully authenticated");
    }

    //@HystrixCommand(fallbackMethod = "defaultMessage")
    @PostMapping("/add")
    public void createUser(@RequestBody User user){
        userRepository.save(user);
    }

    //@HystrixCommand(fallbackMethod = "defaultMessage")
    @DeleteMapping(path = { "/{id}" })
    public User deleteUser(@PathVariable("id") long id) {
        User user = userRepository.findById(id).get();
        userRepository.deleteById(id);
        return user;
    }

    public String defaultMessage() {
        return "Circuit breaker here !!";
    }
}
