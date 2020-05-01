package com.example.microservice2;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "guitars")
public class GuitarService {

    @Autowired
    private InstrumentRepositorySQL instrumentRepositorySQL;

    //@HystrixCommand(fallbackMethod = "defaultMessage")
    @GetMapping("/get")
    public List<Guitar> getGuitars(){
        System.out.println("il rentre dans getInstruments");
        return instrumentRepositorySQL.findAll();
    }

    //@HystrixCommand(fallbackMethod = "defaultMessage")
    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Guitar getGuitar(@PathVariable(value = "id") Long id){
        System.out.println(id);
        return instrumentRepositorySQL.findById(id).orElse(null);
    }

    /*@PostMapping("/upload")
    public void uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        this.bytes = file.getBytes();
    }*/

    //@HystrixCommand(fallbackMethod = "defaultMessage")
    @PostMapping("/add")
    public void createGuitar(@RequestBody Guitar guitar) {
        System.out.println("il rentre dans createGuitar");
        //guitar.setPicByte(this.bytes);
        instrumentRepositorySQL.save(guitar);
        //this.bytes = null;
    }

    //@HystrixCommand(fallbackMethod = "defaultMessage")
    @DeleteMapping(path = { "/{id}" })
    public Guitar deleteGuitar(@PathVariable("id") long id) {
        System.out.println("il rentre dans deleteGuitar");
        Guitar guitar = instrumentRepositorySQL.findById(id).get();
        instrumentRepositorySQL.deleteById(id);
        return guitar;
    }
}