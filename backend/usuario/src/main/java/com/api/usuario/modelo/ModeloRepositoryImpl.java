package com.api.usuario.modelo;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

@Repository
public class ModeloRepositoryImpl implements ModeloRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void truncateTable() {
        entityManager.createNativeQuery("TRUNCATE TABLE modelo").executeUpdate();
    }
}

