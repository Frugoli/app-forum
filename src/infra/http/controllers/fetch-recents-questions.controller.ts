import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'

const queryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(queryParamSchema)

type QueryParamSchema = z.infer<typeof queryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentsQuestionController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe)
    page: QueryParamSchema,
  ) {
    const perPage = 20

    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      questions,
    }
  }
}
