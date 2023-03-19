import { User } from '../../auth/entities/user.entity';
import { Connection} from "typeorm";

import { Factory, Seeder } from "typeorm-seeding";

export class UserCreateSeed implements Seeder {

  public async run(factory: Factory, connection: Connection) {
    await connection
    .createQueryBuilder()
    .delete()
    .from(User)
    .execute();
    
    console.log('12, 34, 56 78 90');
    
    // await factory(User)().create();


    await factory(User)().createMany(100);
  }

}