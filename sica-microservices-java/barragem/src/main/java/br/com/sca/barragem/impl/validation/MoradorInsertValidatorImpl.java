package br.com.sca.barragem.impl.validation;
import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.sca.barragem.dto.MoradorNewDTO;
import br.com.sca.barragem.model.Morador;
import br.com.sca.barragem.repository.MoradorRepository;
import br.com.sca.barragem.validation.MoradorInsertValidation;
import br.com.sca.commons.lib.message.FieldMessage;



public class MoradorInsertValidatorImpl implements ConstraintValidator<MoradorInsertValidation, MoradorNewDTO> {

	@Autowired
	private MoradorRepository repo;
	
	@Override
	public void initialize(MoradorInsertValidation ann) {
	}

	@Override
	public boolean isValid(MoradorNewDTO objDto, ConstraintValidatorContext context) {
		
		List<FieldMessage> list = new ArrayList<>();

		Morador aux = repo.findByEmail(objDto.getEmail());
		if (aux != null) {
			list.add(new FieldMessage("email", "Email já existente"));
		}
		
		for (FieldMessage e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}

}