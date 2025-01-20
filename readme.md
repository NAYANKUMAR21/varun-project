# Reset Commands

1. `db.tasks.updateMany({},{$set:{status:"Incomplete"}})`
2. `db.tasks.updateMany({},{$set:{solutions:[]}})`
3. `db.departments.updateMany({},{$set:{entryNumber:0}})`
4. `db.employees.updateMany({},{$set:{TasksCompleted:{completed:0,total:0}}})`
5. `db.employees.updateMany({},{$set:{entryNumberByEmployee:[]}})`
6. `db.latest_update_employees.updateMany({},{})`

---

https://docs.google.com/spreadsheets/d/1ADZUQg02hC02PpP2ULMPs_meAUyGVV8pqaSbGCMBpsY/edit?gid=445592978#gid=445592978

https://docs.google.com/spreadsheets/d/1ADZUQg02hC02PpP2ULMPs_meAUyGVV8pqaSbGCMBpsY/edit?gid=1652169484#gid=1652169484