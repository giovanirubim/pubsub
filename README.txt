Dependências:

	* Para executar este projeto é necessário possuir instalado na máquina o Node.js a partir da
	versão 14. https://nodejs.org/

Este projeto possui três scripts principais em sua execução:

	* index.js - A execução deste script inicia um servidor na porta 9000 para abrir conexões
	WebSocket que permitem a utilização de mensageria no padrão publish-subscribe. Cada mensagem
	recebida gera logs de saída no terminal;

	* bot-airport.js - A execução deste script inicia um bot que simula o monitoramento de um
	aeroporto. Como argumentos devem ser passados os nomes das estações meteorológicas de interesse.
	Conforme as informações das estações vão sendo publicadas os dados vão sendo atualizados na
	interface do terminal;

	* bot-station.js - A execução deste script inicia um bot que simula uma estação meteorológica.
	Como argumento deve ser passado o nome da estação. A cada três segundos a estação publica
	informações de temperatura, umidade e velocidade do vento.

Para a execução dos scripts mencionados anteriormente basta executar a seguinte linha de comando:
	
	node <file> [args]

Exemplo:
	
	node index.js
	node bot-airport.js "toledo"
	node bot-airport.js "foz do iguaçu"
	node bot-station.js "foz do iguaçu"
	node bot-station.js "toledo"
	node bot-airport.js "foz do iguaçu" "toledo"

No exemplo acima, após iniciar o servidor de WebSockets publish-subscribe, são instanciados dois
bots de aeroporto, que monitoram as atualizações climáticas das estações meteorológicas das cidades
de Toledo e de Foz do Iguaçu respectivamente.
A seguir são instanciados dois bots de estação meteorológica para as cidades de Foz do Iguaçu e
Toledo respectivamente.
Por último é instanciado um novo bot de aeroporto que minitora ambas as estações meteorológicas das
cidades de Foz do Iguaçu e de Toledo.
