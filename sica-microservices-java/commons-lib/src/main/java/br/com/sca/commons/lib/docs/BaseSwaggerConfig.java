package br.com.sca.commons.lib.docs;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;

/**
 * @author Jose Bacelar
 */

public class BaseSwaggerConfig {
	private final String basePackage;

	public BaseSwaggerConfig(String basePackage) {
		this.basePackage = basePackage;
	}

	@Bean
	public GroupedOpenApi publicApi() {
		return GroupedOpenApi.builder()
				.group("sica")
				.packagesToScan(basePackage)
				.build();
	}
}
