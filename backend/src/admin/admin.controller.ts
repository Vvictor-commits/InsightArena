import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard/stats')
  async getDashboardStats() {
    return this.adminService.getStats();
  }

  @Get('users')
  async listUsers(@Query() query: any) {
    return this.adminService.listUsers(query);
  }

  @Patch('users/:id/ban')
  async banUser(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @Request() req: any,
  ) {
    return this.adminService.banUser(id, reason, req.user.id);
  }

  @Patch('users/:id/unban')
  async unbanUser(@Param('id') id: string, @Request() req: any) {
    return this.adminService.unbanUser(id, req.user.id);
  }

  @Get('users/:id/activity')
  async getUserActivity(@Param('id') id: string, @Query() query: any) {
    return this.adminService.getUserActivity(id, query);
  }
}
