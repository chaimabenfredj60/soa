package com.universite.soa.course.config;

import com.universite.soa.course.contract.ICourseService;
import com.universite.soa.course.service.CourseServiceImpl;
import org.apache.cxf.Bus;
import org.apache.cxf.jaxws.EndpointImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import jakarta.xml.ws.Endpoint;

@Configuration
public class CxfConfig {

    @Autowired
    private Bus bus;

    // SOAP Endpoint disabled due to JAXB annotation conflicts
    // REST API /courses works fine
    /*
    @Bean
    public Endpoint endpoint(CourseServiceImpl courseServiceImpl) {
        EndpointImpl endpoint = new EndpointImpl(bus, courseServiceImpl);
        endpoint.publish("/course");
        return endpoint;
    }
    */
}
