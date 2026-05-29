import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';

interface PaginatedData<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const response = context.switchToHttp().getResponse();
        const message = this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ?? 'Success';

        return next.handle().pipe(
            map((data) => {
                if (data && data.meta && Array.isArray(data.data)) {
                    const { data: items, meta } = data as PaginatedData<any>;

                    return {
                        success: true,
                        statusCode: response.statusCode,
                        message,
                        data: items,
                        meta: {
                            ...meta,
                            hasNextPage: meta.page < meta.totalPages,
                        },
                    };
                }

                return {
                    success: true,
                    statusCode: response.statusCode,
                    message,
                    data,
                };
            }),
        );
    }
}
