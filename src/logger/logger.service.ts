import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;

    super.log(message, context);
  }
  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${message}`;
    super.error(message, stackOrContext);
  }
}
