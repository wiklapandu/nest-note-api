import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { NotesService } from './notes.service';
import { AuthRequest } from '../requests/auth.request';

@Controller('note')
export class NotesController {
  constructor(private readonly appService: NotesService) {}

  @Get()
  async getNotes(@Res() res: Response, @Req() req: AuthRequest) {
    try {
      const filter = {};
      const { status, search } = req.query;

      if (status || search) {
        filter['$or'] = [
          { $and: [{ status: status, author: req.user.id }] },
          {
            title: {
              $regex: new RegExp(`^${search}`, 'i'),
            },
          },
          {
            content: {
              $regex: new RegExp(`^${search}`, 'i'),
            },
          },
        ];
      } else {
        filter['$or'] = [{ $and: [{ author: req.user.id }] }];
      }

      return res.status(HttpStatus.OK).json({
        status: 'Success',
        data: await this.appService.findAll(filter),
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'failed',
        message: 'Failed error',
        error: error,
      });
    }
  }

  @Get(':id')
  async showNote(@Res() res: Response, @Param() params: any) {
    try {
      const id = params.id;

      return res.status(HttpStatus.OK).json({
        status: 'success',
        data: await this.appService.findById(id),
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'failed',
        message: 'Failed error',
        error: error,
      });
    }
  }

  @Post()
  async storeNote(@Req() req: AuthRequest, @Res() res: Response) {
    try {
      const note = await this.appService.create({
        title: req.body.title,
        color: req.body.color,
        content: req.body.content,
        status: req.body.status || 'open',
        author: req.user.id,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'created note',
        note: note,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'failed',
        message: 'Failed error',
        error: error,
      });
    }
  }

  @Put(':id')
  async updateNote(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Res() res: Response,
  ) {
    try {
      this.appService.update(req.user.id, id, {
        title: req.body.title,
        color: req.body.color,
        content: req.body.content,
        updated_at: new Date(),
        status: req.body.status,
      });

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Success update note',
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'failed',
        message: 'Failed update note',
        error: error,
      });
    }
  }

  @Delete(':id')
  async deleteNote(@Res() res: Response, @Param('id') id: string) {
    try {
      const note = await this.appService.destory(id);

      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Success remove note',
        data: note,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'failed',
        message: 'Failed remove note',
        error: error,
      });
    }
  }
}
