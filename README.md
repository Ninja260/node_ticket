need .env file to run the project, run
cp .env.example .env


call `npm start` to start server


Featues still don't have
_______________________
- Send Notification

Features highlight
____________________
- seeder files that check and run on server start
- Log insert operation is done on the async thread by listening to nodejs event emitter, check in event_emitters folder
- Log is quite bare minimun here, just have text field and some fields that would need someday to migrate logs to support multi-language support.
- api payload are validated,using express-validator, before proceed to controller
- route configs are separeted into their own route group

Note:
- currently jwt token dont' have 'exp' field in the encrypted tokenthat mean that it would never expire.
- refresh token concept is also not implemented here.
- can modify mongo db url in .env file