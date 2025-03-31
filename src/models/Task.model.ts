import {Table, Model, Column} from 'sequelize-typescript';

/**
 * overwrite default plural table name and
 * stop auto generation of createdAt and updatedAt fields
 */
@Table({tableName: 'task', timestamps: false})
class Task extends Model {

    // By default, sequelize adds id to the model. See extended Model above

    @Column({
        allowNull: false
    })
    declare name: string;

    // Column names are not auto translated in regard to camel case
    @Column({
        allowNull: false,
        field: 'is_completed'
    })
    declare isCompleted: boolean;

    @Column({
        allowNull: false
    })
    declare description: string;
}

export default Task;
