package br.com.sca.monitoramento.config;

import org.springframework.context.annotation.Configuration;

import br.com.sca.commons.lib.docs.BaseSwaggerConfig;

/**
 * @author Jose Bacelar
 */
@Configuration
public class SwaggerConfig extends BaseSwaggerConfig {
    public SwaggerConfig() {
        super("br.com.sca.monitoramento.controller");
    }
}
