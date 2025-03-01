package com.patrick.crud.api_crud.Repository;

import com.patrick.crud.api_crud.Entity.Tarefas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefas, Integer> {
}
