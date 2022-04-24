'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => { 
  class Event extends Model {
    static associate({ MeetGreet, Stage, StageEvent, SetTime }) {
      // meet and greets 
      Event.hasMany(MeetGreet, {
        foreignKey: "event_id",
        as: "event_meet_greets"
      })
      Event.hasMany(SetTime,
      {
        foreignKey: "event_id",
        as: "event_set_times"        
      })
      // stages
      Event.belongsToMany(Stage, {
        foreignKey: "event_id",
        as: "event_stages",
        through: StageEvent
      })
    }
  }
  Event.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
  })
  return Event
}