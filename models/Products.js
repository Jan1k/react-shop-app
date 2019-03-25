const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Products = new Schema({
    id: String,
    name: String,
    mini_description: String,
    description: [{
        id: Number,
        title: String,
        text: String
    }],
    price: Number,
    discount_price: Number,
    product_code: Number,
    fewspecifications: [{
        id: Number,
        display_diagonal: Number,
        display_resolution: String,
        camera: Number,
        processor_frequency: Number
    }],
    specifications: [{
        standart: String,
        internet_access: String,
        bluetooth: String,
        WiFi: String,
        Sync: String,
        gps: String,
        agps: String,
        types: String,
        display_colors: String,
        display_resolutions: String,
        display_diagonal: String,
        touch_screen: String,
        touch_screen_type: String,
        multitouch_support: String,
        operating_system: String,
        processor_type: String,
        processor_frequency: Number,
        core_count: Number,
        graphics_accelerator: String,
        amoutRam: String,
        builtin_memory: String,
        card_supporting: String,
        maxMemoryCardSize: String,
        sim_count: String,
        sim_format: String,
        camera: String,
        autofocus: String,
        flash: String,
        video: String,
        front_camera: String,
        mpthree_call: String,
        audioplayer: String,
        videoplayer: String,
        fmradio: String,
        audiojack: String,
        battery_type: String,
        battery_capacity: String,
        supporting_fast_charge: String,
        enclosure_type: String,
        body_material: String,
        height: String,
        width: String,
        thickness: String,
        accelerometer: String,
        light_sensor: String,
        proximity_sensor: String,
    }],
    img: String,
    images: [{
        id: Number,
        link: String,
    }],
    rating: Number,
    quantity: Number,
    capacities: [{
        id: Number,
        capacity: Number,
    }],
    colors: [{
        id: Number,
        color: String,
        name: String,
    }],
    review_count: Number,
    reviews: [{
        id: Number,
        username: String,
        date_created: String,
        text: String,
        positive: String,
        negative: String
    }],
    popularity: Number,
    sale: Boolean
});

module.exports = mongoose.model("Products", Products);