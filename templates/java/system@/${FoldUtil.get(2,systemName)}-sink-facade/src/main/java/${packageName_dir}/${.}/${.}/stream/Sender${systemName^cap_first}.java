/**
 * Copyright (C) 2021  niaoge<78493244@qq.com>
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package ${packageName}.stream;

import java.util.function.Consumer;
import java.util.function.Supplier;

import javax.annotation.Resource;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.util.StringUtils;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxProcessor;

/**
 * @author niaoge
 * @version $Id: ProviderController.java, v 0.1 2021年1月26日 下午11:48:36 XiaZhengsheng Exp $
 */
@Configuration
@Slf4j
public class Sender${systemName?cap_first} {
    
    public static final String destination_key = "spring.cloud.stream.sendto.destination";
    public static final String destination_subfix = "-dest";
    
    private static FluxProcessor<Message<?>,Message<?>> processor;
    
    @Resource(name="fluxProcessor")
    public void setProcessor( FluxProcessor<Message<?>, Message<?>> processor) {
        SenderTrade.processor = processor;
    }
    
    @Bean
    @ConditionalOnMissingBean(Supplier.class)
    public Supplier<Flux<Message<?>>> supplier() {      
        return () -> processor;
    }
    
    public static <T> void sendMessage(String destination, T payload) {
        Message<?> message = MessageBuilder.withPayload(payload)
                .setHeader(destination_key, destination).build();
        processor.onNext(message);
    }
    
    public static <T> void sendMessage(Class<? extends Consumer<T>> receiverClz, T payload) {
        sendMessage(StringUtils.uncapitalize(receiverClz.getSimpleName())+destination_subfix, payload);
    }
    
}
