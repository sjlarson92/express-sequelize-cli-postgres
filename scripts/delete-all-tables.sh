echo "Dropping table ..."
PGPASSWORD="password" psql -d todo_express_sequelizecli -U sashalarson -c 'DROP TABLE IF EXISTS "Tasks" CASCADE;'
PGPASSWORD="password" psql -d todo_express_sequelizecli -U sashalarson -c 'drop table IF EXISTS "SequelizeMeta";'
