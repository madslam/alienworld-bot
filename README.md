# AlienWorld bot

automatisation of mining alienworld game

## how to use

follow this tutorial to create a new navigator page that will be used by puppetter :
https://medium.com/@jaredpotter1/connecting-puppeteer-to-existing-chrome-window-8a10828149e0

You have to be connect on your Wax account in your new navigator tab

Use yarn start to launch app with 2 differents parameter :

- url : url generated with the tutorial
- account : name of your was account

example :

```bash
 yarn start --url=ws://127.0.0.1:9221/devtools/browser/484d1e8c-31e6-4bff-a87b-764d47bcb5c4 --account=2p4ra.wam
```

Delay depend of your land selected. You can find the rigth delay value in the console of your navigator when you are in the game ( if you are mining ).
You can change delay of waiting mining done by changing the value of delay in getNextMineDelay.js
( feel free to send me monney on my wax account 2p4ra.wam to help me to buy a kebab )

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
