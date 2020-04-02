package br.com.sca.auth.docs;

import org.springframework.context.annotation.Configuration;

import br.com.sca.commons.lib.docs.BaseSwaggerConfig;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author Jose Bacelar
 */

@Configuration
@EnableSwagger2
public class SwaggerConfig extends BaseSwaggerConfig {
    public SwaggerConfig() {
        super("br.com.sca.auth.controller");
    }
}