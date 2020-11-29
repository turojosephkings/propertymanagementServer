const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

{ /* const applianceSchema = new Schema ({
    waterheater: {
        type: Boolean,
        required: true,
        default: false
    },
    airconditioner: {
        type: Boolean,
        required: true,
        default: false
    },
    furnace: {
        type: Boolean,
        required: true,
        default: false
    },
    washer: {
        type: Boolean,
        required: true,
        default: false
    },
    dryer: {
        type: Boolean,
        required: true,
        default: false
    },
    dishwasher: {
        type: Boolean,
        required: true,
        default: false
    },
    stove: {
        type: Boolean,
        required: true,
        default: false
    },
    rangehood: {
        type: Boolean,
        required: true,
        default: false
    },
    microwaverangehood: {
        type: Boolean,
        required: true,
        default: false
    },
    refrigerator: {
        type: Boolean,
        required: true,
        default: false
    },
    garagedooropener: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

*/} 

const maintenanceordersSchema = new Schema({
    completed: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    provider: {
        type: String
    }
}, {
    timestamps: true
});

const houseSchema = new Schema({
    ownerid: {
        type: String,
        required: true
    },
    tenantid: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    sqft: {
        type: Number,
        required: true,
        min: 0
    },
    purchaseprice: {
        type: Currency,
        required: true,
        min: 0
    },
    monthlyrent: {
        type: Currency,
        required: true,
        min: 0
    },   
    hoa: {
        type: Boolean,
        default: false
    },
    electricprovider: {
        type: String
    },
    waterprovider: {
        type: String
    },    
    fuelprovider: {
        type: String
    },
    bathrooms: {
        type: Number,
        required: true,
        min: 1
    },
    bedrooms: {
        type: Number,
        required: true,
        min: 1
    },
    halfbathroom: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        required: true
    },
    sewertype: {
        type: String,
        required: true
    },
    petfriendly: {
        type: Boolean,
        required: true,
        default: false
    },
    pool: {
        type: Boolean,
        required: true,
        default: false
    },
    notes: {
        type: String
    },
  //  appliances: [applianceSchema],
    maintenanceorders: [maintenanceordersSchema]
}, {
    timestamps: true
});

const House = mongoose.model('House', houseSchema);

module.exports = House;