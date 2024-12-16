# Reset Commands

1. `db.tasks.updateMany({},{$set:{status:"Incomplete"}})`
2. `db.tasks.updateMany({},{$set:{solutions:[]}})`
3. `db.departments.updateMany({},{$set:{entryNumber:0}})`
4. `db.employees.updateMany({},{$set:{TasksCompleted:{completed:0,total:0}}})`

---
