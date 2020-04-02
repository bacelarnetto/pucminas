package br.com.sca.workflow.ferro.delegate;

import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.delegate.BpmnError;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component("quebrarMinerioDelegate")
public class QuebrarMinerioDelegate implements JavaDelegate {

    @Autowired
    private RuntimeService runtimeService;

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        String id = execution.getProcessInstanceId();
        try {
            Object dog = execution.getVariable("dog");
            if (dog == null) {
                throw new RuntimeException("WHAT!!?");
            }
        } catch (RuntimeException e) {
            throw new BpmnError("Erro_Processo_Minerio");
        }
    }

}
