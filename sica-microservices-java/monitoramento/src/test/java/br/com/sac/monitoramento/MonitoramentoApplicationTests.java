package br.com.sac.monitoramento;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest(classes = MonitoramentoApplicationTests.class)
@TestPropertySource(locations="classpath:application-test.properties")
class MonitoramentoApplicationTests {

	@Test
	void contextLoads() {
	}

}
