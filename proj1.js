var users = {};

function registerUser() {
    var username = document.getElementById('username').value;
    if (!users[username]) {
        users[username] = {
            name: username,
            wins: 0,
            losses: 0,
            ties: 0
        };
        alert(username + '님이 등록되었습니다!');
    } else {
        alert('이미 등록된 유저입니다!');
    }
}

function searchUser() {
    var searchName = document.getElementById('searchName').value;
    if (users[searchName]) {
        var user = users[searchName];
        var scoreOutput = '이름: ' + user.name + ', 승리: ' + user.wins + '회, 패배: ' + user.losses + '회, 무승부: ' + user.ties + '회';
        alert(scoreOutput);
    } else {
        alert('등록되지 않은 유저입니다!');
    }
}

function updateUser() {
    var updateName = document.getElementById('updateName').value;
    var newName = prompt('새로운 이름을 입력하세요:');
    if (users[updateName]) {
        users[newName] = users[updateName];
        users[newName].name = newName;
        delete users[updateName];
        alert('유저 이름이 성공적으로 수정되었습니다!');
    } else {
        alert('등록되지 않은 유저입니다!');
    }
}

function deleteUser() {
    var deleteName = document.getElementById('deleteName').value;
    if (users[deleteName]) {
        delete users[deleteName];
        alert('유저 기록이 성공적으로 삭제되었습니다!');
    } else {
        alert('등록되지 않은 유저입니다!');
    }
}

function playGame() {
    var username = document.getElementById('username').value;
    if (!users[username]) {
        alert('등록되지 않은 유저입니다!');
        return;
    }

    var choices = ['가위', '바위', '보'];
    var computerChoice = choices[Math.floor(Math.random() * choices.length)];
    var userChoice = prompt('가위, 바위, 보 중 하나를 선택하세요.');

    var result = determineWinner(userChoice, computerChoice);

    var output = users[username].name + '님은 ' + userChoice + '를 선택했습니다.<br>';
    output += '컴퓨터는 ' + computerChoice + '를 선택했습니다.<br>';
    output += result;

    document.getElementById('result').innerHTML = output;
    updateScore(username, result);
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return '비겼습니다!';
    } else if (
        (userChoice === '가위' && computerChoice === '보') ||
        (userChoice === '바위' && computerChoice === '가위') ||
        (userChoice === '보' && computerChoice === '바위')
    ) {
        return '이겼습니다!';
    } else {
        return '졌습니다!';
    }
}

function updateScore(username, result) {
    var user = users[username];
    if (result === '이겼습니다!') {
        user.wins++;
    } else if (result === '졌습니다!') {
        user.losses++;
    } else {
        user.ties++;
    }

    var scoreOutput = '이름: ' + user.name + ', 승리: ' + user.wins + '회, 패배: ' + user.losses + '회, 무승부: ' + user.ties + '회';
    document.getElementById('score').innerHTML = scoreOutput;
}