import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
} from "tsoa";
import {ModelExample} from "../../infrastructure/models/modelexample/modelexample";
import {ModelExampleCreationParams, ModelExampleService} from "../../infrastructure/models/modelexample/modelexampleService";

//todo faire methodMM
@Route("example")
export class ExampleController extends Controller {
    @Get("{userId}")
    public async getExample(
        @Path() userId: number,
        @Query() name?: string
    ): Promise<ModelExample> {
        return new ModelExampleService().get(userId, name);
    }

    //todo en savoir plus sur Post et Body
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createModelExample(
        @Body() requestBody: ModelExampleCreationParams
    ): Promise<void> {
        this.setStatus(201); // set return status 201
        new ModelExampleService().create(requestBody);
        return;
    }
}