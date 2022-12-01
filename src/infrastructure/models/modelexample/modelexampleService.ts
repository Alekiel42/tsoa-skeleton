import { ModelExample, Role } from "./modelexample";
//todo autre couche pour sqlite ?


// A post request should not contain an id.
export type ModelExampleCreationParams = Pick<ModelExample, "name" | "games">;

export class ModelExampleService {
    public get(id:number, name?:string): ModelExample {
        return {
            id,
            name: name ?? "toto",
            role: Role.ADMIN,
            games: ["ok", "deux"]
        }
    }

    public create(modelExampleCreationParams: ModelExampleCreationParams): ModelExample {
        return {
            id: Math.floor(Math.random() * 10000), // Random
            role: Role.PLAYER,
            ...modelExampleCreationParams,
        };
    }

}