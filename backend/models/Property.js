const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  builder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  builderName: String,
  location: {
    type: String,
    required: true
  },
  subArea: String,
  city: {
    type: String,
    required: true
  },
  priceRange: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['residential', 'commercial'],
    default: 'residential'
  },
  possessionDate: String,
  reraId: String,
  amenities: [String],
  images: [String],
  brochure: String,
  builderLogo: String,
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5
  },
  featured: {
    type: Boolean,
    default: false
  },
  contact: String,
  description: String,
  status: {
    type: String,
    enum: ['draft', 'active', 'sold', 'inactive'],
    default: 'draft'
  },
  totalUnits: Number,
  availableUnits: Number,
  pricePerSqFt: Number,
  totalArea: String,
  floorPlans: [{
    type: String,
    beds: Number,
    baths: Number,
    area: String,
    price: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Property', propertySchema);