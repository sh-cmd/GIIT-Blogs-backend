import { Body, Controller, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/currentUserDecorator';
import { UpdateUserDto } from 'src/dtos/update.user.dto';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/gaurds/AuthGaurd';
import { UserService } from './user.service';

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller('user')
@ApiBearerAuth('access-token')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Patch('/:id')
    updateUserById(@Param('id') id: string, @Body() body: UpdateUserDto, @CurrentUser() user: User){
        return this.userService.updateById(id, body, user)
    }

    @Patch('/:email')
    updateUserByEmail(@Param('email') email: string, @Body() body: UpdateUserDto, @CurrentUser() user: User){
        return this.userService.updateByEmail(email, body, user)
    }

    @Delete('/:id')
    deleteUserById(@Param('id') id: string, @CurrentUser() user: User){
        return this.userService.deleteById(id, user)
    }

    @Delete('/:email')
    deleteUserByEmail(@Param('email') email: string, @CurrentUser() user: User){
        return this.userService.deleteByEmail(email, user)
    }


}