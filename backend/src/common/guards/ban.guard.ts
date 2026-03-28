import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BanGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest();

    if (user && user.is_banned) {
      throw new ForbiddenException(
        `Your account has been banned. Reason: ${user.ban_reason || 'No reason provided'}`,
      );
    }

    return true;
  }
}
