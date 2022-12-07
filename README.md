# Family-Budget

Żeby uruchomić frontend potrzebujemy pobrać node js
[Link](https://nodejs.org/en/)
<br>
Następnie potrzebujemy wpisać 2 komendy w terminalu, gdy będziemy w folderze react_demo.
```
npm install
npm start
```

<img width="867" alt="npmstart" src="https://user-images.githubusercontent.com/100320142/206244085-6f9720cf-c945-496d-a0b3-5dda3ce28aed.png">

Endpointy związane z categorią nie są jeszcze dodane do frontu, jednak w celu przetestowania można to zrobić w ten sposób.
<br>

![GeneretePost](https://user-images.githubusercontent.com/100320142/206244339-5497b245-844f-4c8b-b6f1-0f5c19cac5cd.png)

Jeżeli jest @RequestBody musimy dołączyć w body obiekt
<br>

![PostCat](https://user-images.githubusercontent.com/100320142/206245008-a3b3c20c-6e83-4a0c-bab2-129f782d4dae.png)

Jeżeli wykonaliśmy wszystko dobrze, powinniśmy dostać odpowiedź zwrotną dodanego obiektu (dla postu) i response code 201.
<br>

![201](https://user-images.githubusercontent.com/100320142/206245120-a0079399-b599-4bcc-82f0-0371a1c5c143.png)
<br>
[Link do dokumentacji HTTP response status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
