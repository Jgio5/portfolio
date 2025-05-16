<?php
// Verifica se il modulo è stato inviato
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se i campi obbligatori sono stati compilati
    if (!empty($_POST["name"]) && !empty($_POST["email"]) && !empty($_POST["message"])) {

        $name = $_POST["name"];
        $email = $_POST["email"];
        $phone = $_POST["phone"];
        $message = $_POST["message"];

        // Indirizzo email a cui inviare i dati del form
        $to = "info@giorgiolopez.com";

        $subject = "Messaggio da $name";

        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";

        $email_content = "Nome: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Telefono: $phone\n";
        $email_content .= "Messaggio:\n$message";

        // Invia l'email
        if (mail($to, $subject, $email_content, $headers)) {
            header("Location: grazie");
            exit();
        } else {
            die("Errore durante l'invio dell'email.");
        }
    } else {
        $errorMessage = "I campi obbligatori non sono stati compilati.";
    }
} else {
    $errorMessage = "Accesso non consentito.";
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/contatti.css">
    <link rel="stylesheet" href="css/darkmode.css">
    <title>Errore di Accesso</title>
    <meta name="robots" content="noindex, nofollow">
</head>
<body id="verifica-form">
    <div class="error-container">
        <h2>Errore</h2>
        <p class="error-message"><?php echo isset($errorMessage) ? $errorMessage : ''; ?></p>
        <p class="return-home">Torna alla <a href="https://giorgiolopez.com/">pagina principale</a>.</p>
    </div>
    <script src="js/script.js"></script>
</body>
</html>

