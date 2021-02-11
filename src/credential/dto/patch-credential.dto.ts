import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PatchCredentialDto {
  @ApiProperty({
    name: 'credential_name',
    description: 'Credential name to be displayed in UI',
    example: 'YubiKey 5 Series',
    minLength: 2,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  credential_name: string;
}
