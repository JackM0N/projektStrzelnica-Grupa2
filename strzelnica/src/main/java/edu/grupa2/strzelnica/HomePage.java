package edu.grupa2.strzelnica;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomePage {
    @GetMapping("/")
    public String index() {
        return "Aplikacja springboot działa poprawnie!";
    }

}
