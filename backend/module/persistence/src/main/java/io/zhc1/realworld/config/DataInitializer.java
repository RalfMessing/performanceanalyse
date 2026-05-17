package io.zhc1.realworld.config;

import javax.sql.DataSource;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

@Component
class DataInitializer implements ApplicationRunner {
    private final DataSource dataSource;
    private final JdbcTemplate jdbcTemplate;

    DataInitializer(DataSource dataSource, JdbcTemplate jdbcTemplate) {
        this.dataSource = dataSource;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(ApplicationArguments args) {
        Long userCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users", Long.class);
        if (userCount != null && userCount == 0) {
            var populator = new ResourceDatabasePopulator(new ClassPathResource("data.sql"));
            populator.execute(dataSource);
        }
    }
}
