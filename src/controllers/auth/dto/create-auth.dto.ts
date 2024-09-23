import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {

    @ApiProperty()
    emplid: string;

    // @ApiProperty()
    // name: string;

    // @ApiProperty()
    // email: string;

    // @ApiProperty()
    // id: number;
}
