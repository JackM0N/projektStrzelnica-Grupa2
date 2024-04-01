package pl.edu.uniwersytetkaliski.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@GetMapping("/")
	public String index() {
		return "Aplikacja springboot działa poprawnie!";
	}

}
