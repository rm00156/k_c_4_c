module.exports = function(sequelize, Sequelize) {
 
    const DataTypes = Sequelize.DataTypes;
    var Account = sequelize.define('account', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        
        accountNumber:{
            type:Sequelize.STRING,
            unique:true
        },
 
        accountTypeFk: {
            type: Sequelize.INTEGER,
            allowNull:false
        },

        name:{
            type:Sequelize.STRING,
            allowNull:false
        },

        email:{
            type:Sequelize.STRING,
            allowNull:false
        },

        password:{
            type:Sequelize.STRING,
            allowNull:false
        },

        createdDttm:{
            type:Sequelize.DATE,
            allowNull:false
        },
        
        lastModifiedDttm:{
            type:Sequelize.DATE,
            allowNull:true   
        },

        defaultPassword:{
            type:Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },

        guestFl:{
            type:Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:true
        },

        closedDttm:{
            type:Sequelize.DATE,
            allowNull:true
        },

        secret:{
            type:Sequelize.STRING,
            allowNull:true
        },
        deleteFl:{
            type:Sequelize.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },

        versionNo:{
            type:Sequelize.INTEGER,
            allowNull:false,
            defaultValue:1
        }
    
    },{
        timestamps:false
    }
);
 
    return Account;
 
}