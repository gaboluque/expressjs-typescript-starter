import { Model } from 'mongoose';

const updateOptions = { new: true, runValidators: true };

export default (model: Model<any>) => ({
  findById(id: string, projection = {}, options = {}) {
    return model.findById(id, projection, options).lean();
  },
  findOne(filter = {}, projection = {}, options = {}) {
    return model.findOne(filter, projection, options).lean();
  },
  find(filter = {}, projection = {}, options = {}) {
    return model.find(filter, projection, options);
  },
  updateById(id: string, update = {}, options = {}) {
    return model.findByIdAndUpdate(id, update, {
      ...updateOptions,
      ...options,
    });
  },
  update(filter = {}, update = {}, options = {}) {
    return model.findOneAndUpdate(filter, update, {
      ...updateOptions,
      ...options,
    });
  },
  create(item: any) {
    return model.create(item);
  },
  deleteById(id: string) {
    return model.findByIdAndDelete(id);
  },
  incrFieldById(id: string, field: string, inc = 1) {
    return this.updateById(id, {
      $inc: {
        [field]: inc,
      },
    });
  },
});
