import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ApiResponse } from '@shared/api-responses/api.response';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Partial<ApiResponse<T>>>
{
  private readonly _logger = new Logger(ResponseInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Partial<ApiResponse<T>>> {
    return next.handle().pipe(
      map((data) => {
        const isArray = Array.isArray(data);
        const countItems =  data.length;

        const response: Partial<ApiResponse<T>> = {
          data,
          message: 'Success',
          error: false,
        };

        if (isArray && countItems > 0) {
          response.page = 1;
          response.perPage = 10;
          response.total = 100;
          response.totalPages = 10;
        }

        return response;
      }),
      catchError((error) => {
        let message = 'An unknown error occurred.';
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

        this._logger.error('Error caught in ResponseInterceptor', error?.stack || error);

        if (error instanceof HttpException) {
          const {message:msg, statusCode:stCode} = error.getResponse() as any;
          message = msg;
          statusCode = stCode;
        }

        const errorResponse: Partial<ApiResponse<T>> = {
          data: null,
          message: message,
          error: true,
          statusCode: statusCode
        };

        return throwError(() => errorResponse);
      }),
    );
  }
}
