class BaseService {
  constructor(model, validationSchema) {
    this.model = model;
    this.validationSchema = validationSchema;
  }

  validateData(data) {
    const validation = this.validationSchema.safeParse(data);
    if (!validation.success) {
      throw new AppError(
        "Validation Error",
        400,
        validation.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`)
      );
    }
    return validation.data;
  }

  async create(data) {
    const validatedData = this.validateData(data);
    return await this.model.create(validatedData);
  }

  async findById(id) {
    const result = await this.model.findById(id);
    if (!result) throw new AppError(`${this.model.modelName} not found`, 404);
    return result;
  }

  async findAll() {
    return await this.model.find();
  }

  async update(id, data) {
    const validatedData = this.validateData(data);
    const updated = await this.model.findByIdAndUpdate(id, validatedData, {
      new: true,
    });
    if (!updated) throw new AppError(`${this.model.modelName} not found`, 404);
    return updated;
  }

  async delete(id) {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) throw new AppError(`${this.model.modelName} not found`, 404);
    return deleted;
  }
}

module.exports = BaseService;
