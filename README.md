# 基于vue + element 的后台管理系统

七、安全加固
1、不使用root运行mongodb，创建普通用户运行mongodb
2、精确bind_ip（不要使用0.0.0.0）
3、使用登录验证 （auth = true）
4、mongodb的端口不允许对外开放