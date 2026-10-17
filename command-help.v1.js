/* Ajuda contextual PSA / ISA. Sem dependências; preserva textContent e os exemplos copiados.
 * Referências: GNU Coreutils, Debian manpages, man.archlinux.org, vimhelp.org,
 * documentação oficial Ansible. Opções são resolvidas por comando, nunca globalmente.
 */
(() => {
 'use strict';
 if (window.commandHelpInstalled) return;
 window.commandHelpInstalled = true;
 const commands = {
 sort:'Ordena linhas de texto. As opções escolhem o critério e a direção da ordenação.',
 join:'Combina linhas de dois arquivos por um campo comum. Ordene previamente ambos pela chave usada.',
 nl:'Acrescenta números às linhas; por padrão, numera apenas as linhas não vazias do corpo.',
 tee:'Copia a entrada para a saída padrão e para um ou mais arquivos. Sem -a, substitui o conteúdo do destino.',
 ls:'Lista arquivos e diretórios; as opções controlam os detalhes e a ordenação.',
 pwd:'Mostra o caminho do diretório de trabalho atual.',cd:'Muda o diretório de trabalho do shell.',
 cat:'Lê arquivos e escreve seu conteúdo na saída padrão.',head:'Mostra as primeiras linhas; o padrão é 10.',tail:'Mostra as últimas linhas; o padrão é 10.',
 cp:'Copia arquivos ou diretórios para outro destino.',mv:'Move ou renomeia arquivos e diretórios.',rm:'Remove arquivos; opções específicas permitem remover diretórios.',
 mkdir:'Cria diretórios.',rmdir:'Remove diretórios vazios.',touch:'Atualiza datas de arquivos; cria um arquivo vazio se ele não existir.',
 chmod:'Altera as permissões de acesso de arquivos e diretórios.',chown:'Altera o proprietário e, opcionalmente, o grupo de arquivos.',chgrp:'Altera o grupo proprietário de arquivos.',
 umask:'Consulta ou define os bits de permissão retirados na criação de novos arquivos e diretórios.',
 grep:'Seleciona linhas que correspondem a um padrão de busca.',egrep:'Forma histórica de grep -E: usa expressões regulares estendidas.',
 echo:'Escreve os argumentos na saída padrão, normalmente seguidos de uma quebra de linha.',printf:'Escreve dados seguindo uma string de formato; não adiciona uma quebra de linha automaticamente.',
 sudo:'Executa um comando como outro usuário, normalmente root, conforme as permissões configuradas.',su:'Troca a identidade do usuário; sem um nome, tenta usar root.',exit:'Encerra o shell atual ou retorna ao shell anterior.',
 whoami:'Mostra o nome do usuário efetivo.',id:'Mostra identificadores de usuário e grupos.',passwd:'Altera uma senha. Sem argumento, altera a senha do usuário atual.',
 useradd:'Cria uma conta de usuário com as opções informadas.',adduser:'Assistente para criar usuários, diretório pessoal e senha em Debian/Ubuntu.',userdel:'Remove uma conta de usuário.',deluser:'Ferramenta Debian/Ubuntu para remover usuários.',getent:'Consulta bases de contas e outros registros configurados no sistema.',
 ps:'Mostra uma seleção dos processos em execução.',kill:'Envia um sinal a processos; normalmente solicita seu encerramento.',shutdown:'Agenda o desligamento ou reinício do sistema.',
 ip:'Consulta e administra interfaces, endereços e rotas de rede.',ifconfig:'Ferramenta tradicional para consultar/configurar interfaces de rede.',ping:'Envia solicitações ICMP para testar alcance e medir o tempo de resposta.',
 'apt':'Gerencia pacotes e dependências nas distribuições baseadas em Debian.', 'apt-get':'Interface de linha de comando do APT para operações com pacotes e dependências.',
 dpkg:'Instala, remove e consulta pacotes Debian locais. Não busca automaticamente dependências nos repositórios.',
 dnf:'Gerencia pacotes RPM, repositórios e dependências em distribuições como Fedora.',yum:'Gerenciador de pacotes RPM; em sistemas recentes, pode encaminhar operações ao DNF.',rpm:'Instala, remove e consulta pacotes RPM locais.',pacman:'Gerencia pacotes e dependências no Arch Linux e derivados.',
 command:'Consulta comandos ou os executa sem a resolução habitual de funções do shell.',
 man:'Abre a página de manual do assunto informado.',info:'Abre documentação no formato Info.',
 findmnt:'Mostra informações sobre sistemas de arquivos montados.',mount:'Monta um sistema de arquivos em um diretório.',readlink:'Mostra o destino de links simbólicos; opções permitem resolver o caminho completo.',du:'Estima o espaço em disco usado por arquivos e diretórios.',df:'Mostra espaço usado e disponível nos sistemas de arquivos.',
 uname:'Mostra informações do sistema e do kernel.',lsblk:'Lista dispositivos de bloco, como discos e partições.',mktemp:'Cria um arquivo ou diretório temporário com nome único.',
 dd:'Copia dados em blocos entre uma entrada e uma saída, com parâmetros como if= e of=.',
 stat:'Mostra metadados de arquivos: permissões, proprietário, tamanho e datas.',test:'Avalia uma condição e indica verdadeiro/falso pelo status de saída.',
 vim:'Abre o editor modal Vim.',vi:'Abre o editor vi ou uma implementação compatível.',vimtutor:'Abre o tutorial prático do Vim.',
 bash:'Executa o shell Bash ou um script indicado.',sh:'Executa um shell compatível com sh ou um script.',
 export:'Torna uma variável disponível aos processos iniciados pelo shell.',date:'Mostra ou ajusta data e hora; sem opções, mostra a data atual.',
 tree:'Lista diretórios em forma de árvore.',wc:'Conta linhas, palavras e bytes.',uniq:'Filtra repetições adjacentes; geralmente é usado após sort.',shuf:'Embaralha linhas da entrada.',
 systemctl:'Consulta e controla serviços e outras unidades do systemd.',find:'Procura arquivos em uma árvore de diretórios segundo critérios.',
 clear:'Limpa a exibição do terminal.',history:'Mostra o histórico de comandos do shell.',
 };
 const opts={
 ls:{l:'Usa formato longo: permissões, proprietário, grupo, tamanho e data.',a:'Inclui nomes ocultos, que começam com ponto.',h:'Mostra tamanhos em unidades legíveis, como K, M e G.',r:'Inverte a ordem da listagem.',t:'Ordena pela data de modificação, mais recentes primeiro.',d:'Lista o próprio diretório, em vez do seu conteúdo.',R:'Lista subdiretórios recursivamente.'},
 sort:{n:'Ordena numericamente, em vez de comparar os números como texto.',r:'Inverte o critério de ordenação.',u:'Produz uma linha para cada chave de ordenação distinta.',h:'Ordena valores com unidades, como K, M e G.',k:'Define os campos usados como chave de ordenação.',t:'Define o caractere que separa os campos.',R:'Usa uma ordem aleatória de chaves, agrupando chaves iguais.',b:'Ignora espaços iniciais ao comparar.',f:'Ignora diferenças entre maiúsculas e minúsculas.',o:'Grava o resultado no arquivo indicado.'},
 join:{a:'Inclui também linhas sem par do arquivo 1 ou 2 indicado.',v:'Mostra apenas linhas sem par do arquivo 1 ou 2 indicado.',1:'Escolhe o campo de junção do primeiro arquivo.',2:'Escolhe o campo de junção do segundo arquivo.',t:'Define o separador dos campos.',i:'Ignora maiúsculas e minúsculas ao comparar as chaves.',o:'Escolhe os campos exibidos na saída.'},
 nl:{b:'Escolhe quais linhas do corpo serão numeradas: a=todas, t=não vazias.',n:'Define o formato: rn=direita, ln=esquerda, rz=direita com zeros.',w:'Define a largura mínima da coluna de números.',s:'Define o texto entre o número e a linha.',v:'Define o número inicial.',i:'Define o incremento da numeração.'},
 tee:{a:'Acrescenta ao fim dos arquivos, preservando o conteúdo anterior.'},
 cat:{n:'Numera todas as linhas da saída.',b:'Numera apenas as linhas não vazias.'},
 head:{n:'Define quantas linhas iniciais serão mostradas.',c:'Define a quantidade de bytes iniciais.'},
 tail:{n:'Define quantas linhas finais serão mostradas.',f:'Acompanha novas linhas acrescentadas ao arquivo.'},
 cp:{r:'Copia diretórios recursivamente.',R:'Copia diretórios recursivamente.',a:'Copia recursivamente preservando atributos, quando possível.',i:'Pede confirmação antes de sobrescrever.',v:'Mostra os itens copiados.'},
 mv:{i:'Pede confirmação antes de sobrescrever.',v:'Mostra os itens movidos.'},
 rm:{r:'Remove diretórios e seu conteúdo recursivamente.',R:'Remove diretórios e seu conteúdo recursivamente.',f:'Não pede confirmação e ignora arquivos inexistentes.',i:'Pede confirmação antes de cada remoção.'},
 mkdir:{p:'Cria diretórios intermediários necessários e aceita um destino que já existe.'},
 chmod:{R:'Altera permissões recursivamente na árvore de diretórios.'},chown:{R:'Altera o proprietário recursivamente.'},
 grep:{n:'Mostra o número da linha correspondente.',i:'Ignora diferenças entre maiúsculas e minúsculas.',v:'Seleciona linhas que NÃO correspondem ao padrão.',E:'Usa expressões regulares estendidas, incluindo alternância com |.',r:'Pesquisa recursivamente nos diretórios.',c:'Conta linhas que correspondem ao padrão.',l:'Mostra apenas nomes de arquivos com correspondência.',F:'Interpreta o padrão como texto literal.'},
 sudo:{i:'Abre um shell de login do usuário de destino, normalmente root.',u:'Seleciona o usuário com o qual o comando será executado.'},
 useradd:{m:'Cria o diretório pessoal do novo usuário.',s:'Define o shell de login da conta.',p:'Recebe uma senha já criptografada (hash), não uma senha em texto puro.',d:'Define o diretório pessoal.',G:'Define grupos suplementares.'},userdel:{r:'Remove também o diretório pessoal e a caixa de correio da conta.'},deluser:{'remove-home':'Remove também o diretório pessoal e a caixa de correio.'},
 ps:{e:'Seleciona todos os processos.',f:'Usa uma listagem com campos completos.',u:'Seleciona usuários ou altera o formato, conforme a sintaxe usada.'},
 ping:{c:'Envia a quantidade indicada de solicitações e depois encerra.'},
 dpkg:{l:'Lista pacotes conhecidos e seus estados.',s:'Mostra o estado e os detalhes do pacote.',L:'Lista os arquivos instalados por um pacote.',S:'Procura qual pacote possui o caminho informado.',I:'Mostra informações de um arquivo .deb.',i:'Instala um arquivo .deb local.',r:'Remove o pacote preservando arquivos de configuração gerenciados.',P:'Remove o pacote e seus arquivos de configuração gerenciados.',a:'Com --configure, seleciona todos os pacotes desempacotados ainda não configurados.',configure:'Configura pacotes que foram desempacotados.'},
 apt:{y:'Responde sim automaticamente às confirmações usuais.', 'fix-broken':'Tenta corrigir dependências quebradas.',upgradable:'Filtra a listagem para pacotes com atualização disponível.',installed:'Filtra a listagem para pacotes instalados.'},
 dnf:{y:'Responde sim automaticamente às confirmações usuais.'},yum:{y:'Responde sim automaticamente às confirmações usuais.'},
 rpm:{i:'Instala um arquivo RPM local.'},
 pacman:{S:'Instala/sincroniza pacotes dos repositórios.',Syu:'Sincroniza as bases (-Sy) e atualiza todos os pacotes (-u).',Sy:'Sincroniza as bases; usado isoladamente pode levar a atualização parcial incompatível.',Ss:'Pesquisa pacotes nos repositórios.',Si:'Mostra informações de um pacote dos repositórios.',U:'Instala ou atualiza a partir de um arquivo local.',R:'Remove o pacote.',Rs:'Remove o pacote e dependências que não são mais necessárias e não foram instaladas explicitamente.',Rns:'Remove o pacote e dependências dispensáveis, sem salvar configurações como .pacsave.',Q:'Lista pacotes instalados.',Qi:'Mostra informações de um pacote instalado.',Qo:'Identifica o pacote instalado que possui um arquivo.',Qk:'Verifica a presença dos arquivos de um pacote instalado.',Dk:'Verifica a consistência da base local de pacotes.'},
 command:{v:'Mostra como o shell resolveria o nome do comando.'},readlink:{f:'Resolve links e componentes do caminho para uma forma canônica.'},
 du:{s:'Mostra somente o total para cada argumento.',h:'Mostra tamanhos em unidades legíveis.'},df:{h:'Mostra tamanhos em unidades legíveis.'},
 uname:{r:'Mostra a versão do kernel.',a:'Mostra todas as informações disponíveis selecionadas por uname.'},lsblk:{f:'Mostra informações dos sistemas de arquivos, como tipo, rótulo e UUID.'},
 mktemp:{d:'Cria um diretório temporário em vez de um arquivo.'},stat:{c:'Define o formato usado para apresentar os metadados.'},test:{d:'Verifica se o caminho existe e é um diretório.'},bash:{e:'Encerra em várias situações de falha de comando; há exceções em condicionais e pipelines.'},
 wc:{l:'Conta quebras de linha.',w:'Conta palavras.',c:'Conta bytes.'},uniq:{c:'Mostra a quantidade de ocorrências adjacentes.'},
 find:{name:'Seleciona nomes que correspondem ao padrão.',type:'Seleciona um tipo de arquivo.',mtime:'Seleciona por idade da modificação em dias.'}
 };
 opts['apt-get']=opts.apt;
 const actions={
 apt:{update:'Atualiza os índices dos repositórios; não atualiza os programas instalados.',upgrade:'Atualiza os pacotes instalados sem remover pacotes existentes.',install:'Instala ou atualiza os pacotes indicados, resolvendo dependências.',remove:'Remove os pacotes, preservando configurações gerenciadas.',purge:'Remove os pacotes e suas configurações gerenciadas; não apaga os arquivos pessoais do usuário.',autoremove:'Remove dependências instaladas automaticamente que não são mais necessárias.',clean:'Apaga arquivos de pacotes baixados que estão no cache.',search:'Pesquisa nomes e descrições de pacotes.',show:'Mostra detalhes de um pacote.',policy:'Mostra versões instaladas, candidatas e prioridades das fontes.',depends:'Mostra dependências do pacote.',list:'Lista pacotes segundo os filtros informados.'},
 dnf:{install:'Instala pacotes com suas dependências.',remove:'Remove os pacotes indicados e resolve os efeitos nas dependências.',upgrade:'Atualiza os pacotes instalados.',update:'Atualiza os pacotes instalados.',search:'Pesquisa pacotes.',info:'Mostra detalhes do pacote.',autoremove:'Remove dependências dispensáveis.',repolist:'Lista repositórios.',repoinfo:'Mostra detalhes dos repositórios.',history:'Consulta o histórico de transações.',provides:'Procura o pacote que fornece um arquivo ou recurso.', 'check-upgrade':'Verifica se há atualizações disponíveis.',check:'Verifica problemas na base de pacotes.',clean:'Limpa dados de cache selecionados.',makecache:'Obtém e armazena metadados dos repositórios.'},
 ip:{addr:'Seleciona operações sobre endereços das interfaces.',show:'Exibe as informações solicitadas.',route:'Seleciona operações sobre a tabela de rotas.'},
 systemctl:{status:'Mostra o estado da unidade ou serviço.',start:'Inicia uma unidade.',stop:'Para uma unidade.',restart:'Reinicia uma unidade.',enable:'Habilita a inicialização automática da unidade.'},
 getent:{passwd:'Consulta a base de contas de usuário.'}
 };
 actions['apt-get']=actions.apt;actions.yum=actions.dnf;
 const vim={h:'Move um caractere à esquerda.',j:'Move uma linha para baixo.',k:'Move uma linha para cima.',l:'Move um caractere à direita.',w:'Vai ao início da próxima palavra.',b:'Volta ao início da palavra anterior.',W:'Avança por palavras delimitadas por espaços.',B:'Recua por palavras delimitadas por espaços.','0':'Vai ao início da linha.','^':'Vai ao primeiro caractere não branco da linha.','$':'Vai ao fim da linha.',gg:'Vai à primeira linha.',G:'Vai à última linha ou à linha indicada por uma contagem.',H:'Vai à linha superior da janela.',M:'Vai à linha central da janela.',L:'Vai à linha inferior da janela.',i:'Entra em Inserção antes do cursor.',a:'Entra em Inserção após o cursor.',I:'Insere antes do primeiro caractere não branco.',A:'Insere no fim da linha.',o:'Abre uma linha abaixo e entra em Inserção.',O:'Abre uma linha acima e entra em Inserção.',Esc:'Retorna ao modo Normal ou cancela a operação atual.',d:'Operador de apagar: combine com um movimento ou repita para apagar linhas.',y:'Operador de copiar: combine com um movimento ou repita para copiar linhas.',c:'Operador de alteração: remove o trecho escolhido e entra em Inserção.',x:'Apaga o caractere sob o cursor.',D:'Apaga do cursor até o fim da linha.',dw:'Apaga do cursor até o início da próxima palavra.',dd:'Apaga a linha atual.',dG:'Apaga da linha atual até o fim do arquivo.','d$':'Apaga do cursor ao fim da linha.','d^':'Apaga até o primeiro caractere não branco da linha.',rX:'Substitui o caractere sob o cursor por X.',R:'Entra em modo Substituição.',cw:'Altera a palavra a partir do cursor e entra em Inserção.',cc:'Altera a linha atual e entra em Inserção.','c$':'Altera do cursor até o fim da linha.','c^':'Altera até o primeiro caractere não branco.',cG:'Altera da linha atual até o fim do arquivo.',u:'Desfaz a última alteração.','Ctrl-r':'Refaz uma alteração desfeita.','.':'Repete a última alteração.',yy:'Copia a linha atual.',yw:'Copia até a próxima palavra.',yG:'Copia até o fim do arquivo.','y$':'Copia até o fim da linha.','y^':'Copia até o primeiro caractere não branco.',p:'Cola depois do cursor, ou abaixo para linhas inteiras.',P:'Cola antes do cursor, ou acima para linhas inteiras.',n:'Repete a busca no mesmo sentido.',N:'Repete a busca no sentido oposto.','~':'Alterna maiúscula/minúscula no caractere.',v:'Inicia seleção visual por caracteres.',V:'Inicia seleção visual por linhas.','Ctrl-v':'Inicia seleção visual retangular.','Ctrl-g':'Mostra informações do arquivo e da posição.','Ctrl-f':'Avança uma tela.','Ctrl-b':'Recua uma tela.','Ctrl-d':'Avança meia tela.','Ctrl-u':'Recua meia tela.','Ctrl-w':'Inicia um comando de gerenciamento de janelas.','Ctrl-c':'Interrompe a operação ou sai de Inserção; não é idêntico a Esc em todos os casos.',':w':'Grava o arquivo; com um nome, escreve uma cópia nesse caminho.',':r':'Lê um arquivo e insere seu conteúdo abaixo do cursor.',':q':'Fecha a janela atual; recusa se houver alterações não salvas.',':q!':'Fecha descartando alterações não salvas.',':wq':'Grava e fecha a janela.',':x':'Grava se houver alterações e fecha.',ZZ:'Grava se necessário e fecha.',':sh':'Abre um shell; exit retorna ao Vim.',':split':'Divide a janela horizontalmente.',':vsplit':'Divide a janela verticalmente.',':help':'Abre a ajuda do Vim.',':set':'Consulta ou altera opções do editor.',ignorecase:'Faz buscas ignorarem maiúsculas e minúsculas.',noignorecase:'Volta a diferenciar maiúsculas e minúsculas nas buscas.',Home:'Vai ao início da linha.',End:'Vai ao fim da linha.',':':'Entra no modo de comandos de linha do Vim.','/':'Inicia uma busca para a frente.','?':'Inicia uma busca para trás.','60i-Esc':'No modo Normal: digite 60i, depois o hífen e Esc, para inserir 60 hífens.'};
 const paths={'/':'Raiz da árvore de diretórios.','/etc':'Configurações do sistema.','/home':'Diretórios pessoais dos usuários comuns.','/root':'Diretório pessoal de root.','/usr':'Programas, bibliotecas e dados compartilhados instalados pelo sistema.','/usr/local':'Programas e dados instalados localmente pelo administrador.','/bin':'Comandos essenciais; em sistemas com usrmerge, aponta para /usr/bin.','/sbin':'Comandos de administração; pode apontar para /usr/sbin.','/lib':'Bibliotecas essenciais; pode apontar para /usr/lib.','/lib64':'Bibliotecas para a arquitetura de 64 bits, quando usado.','/boot':'Arquivos necessários à inicialização, como kernel e carregador.','/dev':'Arquivos que representam dispositivos.','/dev/null':'Descarta tudo que recebe; a leitura retorna fim de arquivo.','/dev/zero':'Produz bytes zero ao ser lido.','/proc':'Sistema virtual com informações de processos e do kernel.','/proc/meminfo':'Informações de memória disponibilizadas pelo kernel.','/proc/cpuinfo':'Informações dos processadores disponibilizadas pelo kernel.','/sys':'Sistema virtual com dispositivos, drivers e informações do kernel.','/run':'Dados de execução, normalmente voláteis e recriados na inicialização.','/tmp':'Arquivos temporários.','/var':'Dados variáveis, como logs, filas e estado de serviços.','/var/log':'Arquivos de registro de eventos do sistema.','/var/lib':'Dados persistentes de estado de aplicações e serviços.','/media':'Pontos usuais de montagem de mídias removíveis.','/mnt':'Ponto convencional para montagens temporárias.','/opt':'Aplicativos adicionais instalados em diretórios próprios.','/srv':'Dados oferecidos por serviços deste sistema.','/etc/passwd':'Registros das contas: nome, UID, GID, diretório pessoal e shell.','/etc/shadow':'Hashes de senhas e regras de expiração; acesso restrito.','/etc/group':'Registros dos grupos locais.','/etc/os-release':'Identificação e versão da distribuição Linux.','/bin/bash':'Caminho do shell Bash.','/etc/apt/sources.list':'Arquivo tradicional de configuração de repositórios APT.','/etc/apt/sources.list.d/':'Diretório de arquivos adicionais de repositórios APT.'};
 const operators={'|':'Pipe: envia a saída padrão do comando à entrada padrão do próximo.','>':'Redireciona a saída padrão para um arquivo, criando-o ou substituindo seu conteúdo.','>>':'Redireciona a saída padrão, acrescentando ao final do arquivo.','<':'Usa um arquivo como entrada padrão.','2>':'Redireciona mensagens de erro (stderr).','2>>':'Acrescenta mensagens de erro ao arquivo.','2>&1':'Faz stderr usar o mesmo destino atual de stdout.','&&':'Executa o próximo comando somente se o anterior terminar com sucesso.','||':'Executa o próximo comando somente se o anterior falhar.',';':'Separa comandos executados em sequência.','\\':'No fim da linha, continua o comando na próxima linha.','!':'Nega o resultado de uma condição ou pipeline, conforme o contexto.'};
 const take={sort:['k','t','o'],join:['a','v','1','2','t','o'],nl:['b','n','w','s','v','i'],head:['n','c'],tail:['n'],ping:['c'],useradd:['s','p','d','G'],sudo:['u'],stat:['c'],find:['name','type','mtime']};
 function option(cmd,t){
  if(t==='--')return 'Encerra as opções: os próximos itens serão tratados como argumentos, mesmo que comecem com hífen.';
  if(t==='--help')return 'Mostra a ajuda resumida do comando.';
  if(t==='--version')return 'Mostra a versão do programa.';
  if(t==='-'&&cmd==='su')return 'Inicia um shell de login, carregando o ambiente do usuário de destino.';
  const key=t.replace(/^--?/,''),dict=opts[cmd]||{};
  if(dict[key])return cmd+' '+t+': '+dict[key];
  if(cmd==='sort'&&/^k\d/.test(key))return 'Chave de ordenação: '+key.slice(1)+'. O primeiro número é o campo inicial; após a vírgula, o campo final. b ignora espaços iniciais, n compara números e r inverte a ordem.';
  if(t.startsWith('-')&&!t.startsWith('--')&&key.length>1&&[...key].every(c=>dict[c]))return 'Opções combinadas de '+cmd+': '+[...key].map(c=>'-'+c+' — '+dict[c]).join(' ');
  return null;
 }
 function valueHelp(cmd,flag,t){
  const v=t.replace(/^['"]|['"]$/g,'');
  if(cmd==='nl')return ({b:{a:'Numera todas as linhas, incluindo as vazias.',t:'Numera somente as linhas não vazias.'},n:{rz:'Alinha à direita preenchendo com zeros à esquerda.',rn:'Alinha à direita com espaços.',ln:'Alinha à esquerda.'}}[flag]||{})[v]||({w:'Largura mínima da coluna de números: '+v+'.',s:'Separador entre a numeração e o texto: '+t+'.',v:'Número inicial: '+v+'.',i:'Incremento entre números: '+v+'.'})[flag];
  if(cmd==='join'&&['a','v'].includes(flag))return 'Seleciona o arquivo '+v+' para '+(flag==='a'?'incluir também':'mostrar somente')+' suas linhas sem correspondência.';
  if(cmd==='join'&&['1','2'].includes(flag))return 'Usa o campo '+v+' como chave no arquivo '+flag+'.';
  if(cmd==='sort'&&flag==='k')return 'Especificação da chave de ordenação: '+v+'. O intervalo campo-inicial,campo-final limita quais campos são comparados.';
  if(flag==='t'&&['sort','join'].includes(cmd))return 'Caractere usado como separador dos campos: '+t+'.';
  if(cmd==='ping'&&flag==='c')return 'Quantidade de solicitações ICMP a enviar: '+v+'.';
  if(['head','tail'].includes(cmd)&&flag==='n')return 'Quantidade de linhas a mostrar: '+v+'.';
  if(cmd==='useradd'&&flag==='s')return 'Shell de login que será atribuído à conta: '+v+'.';
  if(cmd==='useradd'&&flag==='p')return 'Valor esperado: hash de senha. Texto puro como '+v+' não define corretamente a senha.';
  if(cmd==='stat'&&flag==='c')return 'Formato: %A=permissões simbólicas, %a=permissões octais, %U=usuário, %G=grupo e %n=nome.';
  return 'Valor da opção -'+flag+' de '+cmd+': '+t+'.';
 }
 function argument(cmd,t,pos,total,prev){
  const v=t.replace(/^['"]|['"]$/g,'');
  if(paths[v])return paths[v];
  if(v==='..')return 'Diretório pai, um nível acima do diretório atual.';
  if(v==='.')return 'Diretório de trabalho atual.';
  if(v==='~'||v.startsWith('~/'))return 'Caminho relativo ao diretório pessoal do usuário; ~ é expandido pelo shell.';
  if(v==='-'&&['join','cat','sort','tee'].includes(cmd))return 'Em '+cmd+', representa a entrada padrão (quando aceito como operando).';
  if(cmd==='chmod'&&/^[0-7]{3,4}$/.test(v)){let ds=v.slice(-3);return 'Permissões octais: '+['dono','grupo','outros'].map((who,i)=>who+'='+['nenhuma','executar','escrever','escrever+executar','ler','ler+executar','ler+escrever','ler+escrever+executar'][+ds[i]]).join('; ')+'.';}
  if(cmd==='chmod'&&/^[ugoa]*[+=-][rwxXstugo]*(,[ugoa]*[+=-][rwxXstugo]*)*$/.test(v))return 'Modo simbólico: u=dono, g=grupo, o=outros, a=todos; +=adiciona, -=remove, =define exatamente; r=leitura, w=escrita, x=execução/travessia. Aplica '+v+'.';
  if(cmd==='umask'&&/^[0-7]+$/.test(v))return 'Máscara octal: bits de permissão retirados na criação; arquivos comuns partem normalmente de 666 e diretórios de 777.';
  if(cmd==='grep'||cmd==='egrep'){if(pos===0)return 'Padrão de busca: '+v+'. '+(v.includes('^')?'^ ancora o início da linha. ':'')+(v.includes('$')?'$ ancora o fim da linha. ':'')+(v.includes('[')?'Colchetes definem conjuntos ou intervalos de caracteres. ':'')+(v.includes('\\.')?'\\. corresponde a um ponto literal. ':'')+(v.includes('|')?'Com -E, | representa alternativas.':'');}
  if(['echo','printf'].includes(cmd))return cmd==='printf'&&pos===0?'Formato da saída: %s insere uma string e \\n insere uma quebra de linha.':'Texto enviado à saída padrão; aspas agrupam espaços em um argumento.';
  if(['apt','apt-get','dnf','yum','pacman','dpkg','rpm'].includes(cmd))return /\.(deb|rpm|zst)$/.test(v)?'Arquivo local de pacote a ser consultado ou instalado: '+v+'.':'Nome ou padrão de pacote/recurso usado pela operação: '+v+'.';
  if(['useradd','adduser','userdel','deluser','passwd','su','id'].includes(cmd))return 'Conta de usuário sobre a qual o comando atua: '+v+'.';
  if(cmd==='ping')return v==='127.0.0.1'?'Endereço de loopback: testa a pilha de rede da própria máquina.':'Destino do teste ICMP: endereço IP ou nome DNS '+v+'.';
  if(cmd==='shutdown')return v==='now'?'Solicita a ação imediatamente.':/^\+\d+$/.test(v)?'Agenda a ação para daqui a '+v.slice(1)+' minutos.':'Mensagem enviada aos usuários antes do desligamento.';
  if(cmd==='man'||cmd==='info')return 'Assunto ou página de documentação a consultar: '+v+'.';
  if(cmd==='dd'&&/^(if|of|bs|count)=/.test(v)){const [k,x]=v.split('=');return ({if:'Arquivo/dispositivo de entrada',of:'Arquivo/dispositivo de saída (será escrito)',bs:'Tamanho dos blocos de entrada e saída',count:'Quantidade de blocos a copiar'})[k]+': '+x+'.';}
  if(v.includes('*')||v.includes('?')||/\[[^\]]+\]/.test(v)||/\{.*\}/.test(v))return 'Padrão expandido pelo shell: * corresponde a zero ou mais caracteres; ? a um; [] a um conjunto; {} gera combinações. Nomes iniciados por ponto normalmente exigem indicação explícita.';
  if(/^\$/.test(v))return 'Expansão de variável ou substituição de comando do shell: '+v+'.';
  if(cmd==='cd')return 'Diretório que se tornará o diretório de trabalho: '+v+'.';
  if(['cp','mv'].includes(cmd))return (pos===total-1?'Destino da cópia/movimentação: ':'Origem a copiar/mover: ')+v+'.';
  if(cmd==='join')return 'Arquivo de dados '+(pos+1)+'; precisa estar ordenado pela chave de junção: '+v+'.';
  if(cmd==='tee')return 'Arquivo de destino que receberá uma cópia da entrada: '+v+'.';
  if(cmd==='mkdir')return 'Diretório a criar: '+v+'.';
  if(cmd==='rm')return 'Arquivo ou diretório a remover: '+v+'.';
  if(cmd==='touch')return 'Arquivo a criar ou cujo horário será atualizado: '+v+'.';
  if(cmd==='test'&&v==='!')return 'Nega a condição que vem em seguida.';
  if(cmd)return 'Argumento de '+cmd+': '+v+'. '+(['sort','cat','nl','head','tail','grep'].includes(cmd)?'Indica um arquivo de entrada.':'Indica o alvo ou valor usado pelo comando.');
  if(/[/.]/.test(v))return 'Nome ou caminho usado no exemplo: '+v+'. Um caminho que começa com / é absoluto; os demais dependem do diretório atual.';
  return null;
 }
 function vimHelp(t){
  if(vim[t])return 'Vim: '+vim[t];
  if(/^:\d+$/.test(t))return 'Vim: vai à linha '+t.slice(1)+'.';
  if(/^:(%|\d+,\d+)s\//.test(t))return 'Vim: substituição. % seleciona o arquivo inteiro; um intervalo limita as linhas. s/antigo/novo/ troca o texto; g troca todas as ocorrências da linha e c pede confirmação.';
  if(/^:!/.test(t))return 'Vim: executa no shell o comando '+t.slice(2)+' e mostra a saída, sem inseri-la no arquivo.';
  if(/^!!/.test(t))return 'Vim: filtra a linha atual pelo comando '+t.slice(2)+' e a substitui pela saída.';
  if(/^\d+[a-zA-Z]+$/.test(t)){const m=t.match(/^(\d+)(.*)$/);return 'Vim: contagem '+m[1]+'. '+(vim[m[2]]||'Aplica o comando '+m[2]+' com essa quantidade.')+(m[2]==='G'?' Aqui a contagem indica o número da linha.':'');}
  if(/^[dyc]\d+w$/.test(t))return 'Vim: combina o operador '+t[0]+' com '+t.slice(1,-1)+' movimentos de palavra.';
  if(/^[/?].+/.test(t))return 'Vim: busca o padrão '+t.slice(1)+' '+(t[0]==='/'?'para a frente.':'para trás.');
  return null;
 }
 const selector='pre,code,kbd,.key,.cmd,.command,.code-box,.terminal,.lab-buttons button,.cmd-btn';
 function context(root){
  const section=root.closest('section,.slide');
  const title=(section?.getAttribute('data-title')||section?.querySelector('h2')?.textContent||'');
  const vimContext=/vim|vi\/vim/i.test(title)||(/editor-vim/.test(location.pathname)&&!root.closest('#helpDialog'));
  const card=root.closest('.card,.q,li,tr');
  const heading=((card?.querySelector('h3,h4')?.textContent||'')+' '+title).toLowerCase();
  let cmd=Object.keys(commands).find(c=>new RegExp('(^|[^a-z])'+c.replace('-','\\-')+'([^a-z]|$)').test(heading))||'';
  if(!cmd&&card){const before=card.textContent.split(root.textContent)[0];const found=[...before.matchAll(/\b(sort|join|nl|tee|ls|cat|head|tail|rm|useradd|userdel|dpkg|pacman|dnf|apt)\b/g)];if(found.length)cmd=found[found.length-1][1];}
  return {cmd,vimContext,title};
 }
 function ranges(text,ctx,inline){
  let result=[],offset=0,carry='';
  for(const line of text.split('\n')){
   const lex=[...line.matchAll(/(?:\d?>&\d|\d?>>?|&&|\|\||[|;<>])|(?:"(?:\\.|[^"\\])*"|'[^']*'|[^\s|;<>"'])+/g)];
   let cmd=carry,flag='',pos=0,redirect=false,active=!!carry,ended=false;
   let start=0;
   if(lex[0]&&/^(?:\S+@\S+[$#]|[$#])$/.test(lex[0][0])){start=1;active=true;}
   if(line.trim().startsWith('#')&&start===0){offset+=line.length+1;continue;}
   for(let i=start;i<lex.length;i++){
    const m=lex[i],t=m[0];let help=null;
    if(t==='#')break;
    if(operators[t]){help=operators[t];if(['|','&&','||',';'].includes(t)){cmd='';pos=0;active=true;ended=false;}else if(/>$/.test(t))redirect=true;}
    else if(redirect){help='Arquivo de destino do redirecionamento: '+t+'. '+(paths[t]||'');redirect=false;}
    else if(flag){help=valueHelp(cmd,flag,t);flag='';}
    else if(commands[t]&&(!cmd||cmd==='sudo'||i===start)){
     // Known commands are recognized only in command position, not inside output or arguments.
     cmd=t;active=true;pos=0;help=commands[t];
    }
    else if(/^[A-Za-z_][A-Za-z_0-9]*=/.test(t)&&(!cmd||cmd==='export')){help=t.startsWith('LC_ALL=')?'Définit la localité'.replace('Définit la localité','Define a localidade de todos os critérios: LC_ALL=C usa regras previsíveis para ordenação e números.'):'Atribui um valor à variável '+t.split('=')[0]+'.';active=true;}
    else if(active||inline){
     const c=cmd||ctx.cmd;
     if(ctx.vimContext&&!cmd&&lex[i-1]?.[0]==='Ctrl-w')help=t==='w'?'Vim: após Ctrl-w, w passa à próxima janela.':'Vim: após Ctrl-w, h/j/k/l escolhem a janela à esquerda/abaixo/acima/à direita; as setas também podem selecionar a direção.';
     else if(ctx.vimContext&&!cmd&&lex[i-1]?.[0]===':r'&&t.startsWith('!'))help='Vim: executa '+t.slice(1)+' no shell e insere a saída abaixo do cursor.';
     else if(ctx.vimContext&&!cmd&&/substitui/i.test(ctx.title)&&['y','n','a','q'].includes(t))help=({y:'Confirma esta substituição.',n:'Pula esta ocorrência.',a:'Confirma todas as substituições restantes.',q:'Encerra a sequência de substituições.'})[t];
     else if(ctx.vimContext&&!cmd&&(help=vimHelp(t))){}
     else if(!ended&&t.startsWith('-')&&(help=option(c,t))){const k=t.replace(/^--?/,'');if(t==='--')ended=true;if((take[c]||[]).includes(k))flag=k;}
     else if(actions[c]?.[t])help=actions[c][t];
     else if(t==='!'&&c==='test')help='Inverte o resultado da condição que segue.';
     else if(t.startsWith('-')&&!ended){
      const alternatives=Object.keys(opts).map(name=>[name,option(name,t)]).filter(x=>x[1]);
      help=alternatives.length?('Opção '+t+' — '+(c?'verifique o contexto de '+c+'. ':'')+alternatives.slice(0,4).map(x=>x[1]).join(' ')):null;
     }
     else {const total=(i+1===lex.length||lex[i+1]?.[0]==='#')?pos+1:999;help=argument(c,t,pos++,total,lex[i-1]?.[0]);}
    }
    if(!help&&inline&&lex.length===1&&!t.startsWith('-'))help=paths[t]||'Valor, nome ou símbolo apresentado no exemplo: '+t+'. Seu papel é indicado pelo comando ou pela explicação ao lado.';
    if(help)result.push({start:offset+m.index,end:offset+m.index+t.length,help});
   }
   carry=active&&/\|\s*$/.test(line)?'':active&&/\\\s*$/.test(line)?cmd:'';
   offset+=line.length+1;
  }
  return result;
 }
 function annotate(root){
  if(root.closest('script,style,textarea,[data-command-help],#command-help-bubble'))return;
  const nodes=[];let text='';
  function collect(el){for(const n of el.childNodes){if(n.nodeType===3){nodes.push({node:n,start:text.length,end:text.length+n.data.length});text+=n.data;}else if(n.nodeType===1){if(n.tagName==='BR'){text+='\n';}else if(!n.matches('script,style,textarea,[data-command-help]'))collect(n);}}}
  collect(root);if(!text.trim())return;
  const inline=!root.matches('pre,.terminal,.code-box');
  let found;
  if(root.matches('.terminal')&&text.includes('state:')&&text.includes('apt:')){
   const d={'-':'Introduz um item da lista de tarefas YAML.','name:':'Nome descritivo da tarefa; dentro de apt, nome do pacote.','apt:':'Módulo Ansible para gerenciar pacotes Debian.','nginx':'Nome do pacote do servidor web a instalar.','state:':'Estado desejado para o pacote.','present':'Garante que o pacote esteja instalado.'};
   found=[...text.matchAll(/\S+/g)].filter(m=>d[m[0]]).map(m=>({start:m.index,end:m.index+m[0].length,help:d[m[0]]}));
  }else if(root.matches('.terminal')&&text.includes('resource')){
   const d={resource:'Declara um recurso em Terraform. Este trecho é um exemplo conceitual; o tipo real depende do provider.','"vm"':'Tipo de recurso ilustrativo; substitua por um tipo válido do provider.','"lab"':'Nome local do recurso no exemplo.',cpu:'Quantidade de CPUs no exemplo conceitual.',memory:'Memória no exemplo conceitual.','2':'Valor ilustrativo: duas CPUs.','"4GB"':'Valor ilustrativo: quatro gigabytes de memória.'};
   found=[...text.matchAll(/\S+/g)].filter(m=>d[m[0]]).map(m=>({start:m.index,end:m.index+m[0].length,help:d[m[0]]}));
  }else found=ranges(text,context(root),inline);
  for(const item of nodes){const matches=found.filter(r=>r.start<item.end&&r.end>item.start);if(!matches.length)continue;const fragment=document.createDocumentFragment();let at=0;
   for(const r of matches){const a=Math.max(0,r.start-item.start),b=Math.min(item.node.data.length,r.end-item.start);fragment.append(document.createTextNode(item.node.data.slice(at,a)));const span=document.createElement('span');span.className='command-help-token';span.dataset.commandHelp=r.help;span.textContent=item.node.data.slice(a,b);if(!root.closest('button,a,label')){span.tabIndex=0;span.setAttribute('role','button');}fragment.append(span);at=b;}
   fragment.append(document.createTextNode(item.node.data.slice(at)));item.node.replaceWith(fragment);
  }
 }
 function scan(scope){while(scope.parentElement?.closest(selector))scope=scope.parentElement.closest(selector);const candidates=[...(scope.matches?.(selector)?[scope]:[]),...scope.querySelectorAll(selector)];for(const root of candidates){if(root.parentElement?.closest(selector))continue;annotate(root);}}
 const css=document.createElement('style');css.textContent=`.command-help-token{cursor:help;text-decoration-line:underline;text-decoration-style:dotted;text-decoration-color:currentColor;text-underline-offset:4px}.command-help-token:hover,.command-help-token:focus-visible{background:rgba(40,220,255,.14);border-radius:3px;outline:2px solid #28dcff;outline-offset:2px}#command-help-bubble{position:fixed;inset:auto;margin:0;box-sizing:border-box;max-width:min(360px,calc(100vw - 24px));padding:14px 17px;border:1px solid #62d9ef;border-radius:13px;background:#081528;color:#eff7ff;font:400 15px/1.5 system-ui,sans-serif;white-space:normal;text-align:left;box-shadow:0 12px 38px #0009;z-index:2147483647;overflow:auto;max-height:calc(100dvh - 24px)}#command-help-bubble[hidden]{display:none!important}#command-help-bubble b{display:block;color:#72e6ff;margin-bottom:5px}#command-help-bubble small{display:block;color:#aebdd3;margin-top:8px;font-size:11px}.command-help-info{font:inherit;border:1px solid #47738c;border-radius:9px;background:#0b2138;color:#d9f6ff;padding:7px 10px;cursor:pointer}.command-help-info:focus-visible{outline:2px solid #28dcff}@media print{#command-help-bubble,.command-help-info{display:none!important}.command-help-token{text-decoration:none}}`;
 document.head.append(css);
 const bubble=document.createElement('div');bubble.id='command-help-bubble';bubble.role='tooltip';bubble.hidden=true;bubble.setAttribute('popover','manual');document.body.append(bubble);
 let anchor=null,timer=null;
 function hide(){clearTimeout(timer);if(anchor)anchor.removeAttribute('aria-describedby');anchor=null;try{bubble.hidePopover();}catch{}bubble.hidden=true;}
 function position(){if(!anchor)return;const r=anchor.getBoundingClientRect();const b=bubble.getBoundingClientRect();bubble.style.left=Math.max(12,Math.min(innerWidth-b.width-12,r.left+r.width/2-b.width/2))+'px';bubble.style.top=(r.top-b.height-10>=12?r.top-b.height-10:Math.min(innerHeight-b.height-12,r.bottom+10))+'px';}
 function show(el){hide();anchor=el;bubble.replaceChildren();const title=document.createElement('b');title.textContent=el.textContent;const body=document.createElement('div');body.textContent=el.dataset.commandHelp;const hint=document.createElement('small');hint.textContent='Esc ou toque fora para fechar';bubble.append(title,body,hint);el.setAttribute('aria-describedby',bubble.id);bubble.hidden=false;try{bubble.showPopover();}catch{}position();}
 document.addEventListener('pointerover',e=>{const el=e.target.closest?.('[data-command-help]');if(el){clearTimeout(timer);if(anchor!==el)show(el);}else if(bubble.contains(e.target))clearTimeout(timer);});
 document.addEventListener('pointerout',e=>{if(e.target.closest?.('[data-command-help]')||bubble.contains(e.target))timer=setTimeout(()=>{if(!bubble.matches(':hover')&&!anchor?.matches(':hover,:focus'))hide();},180);});
 document.addEventListener('focusin',e=>{const el=e.target.closest?.('[data-command-help]');if(el)show(el);else if(!bubble.contains(e.target))hide();});
 document.addEventListener('click',e=>{const el=e.target.closest?.('[data-command-help]');if(el)show(el);else if(!bubble.contains(e.target))hide();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&anchor){hide();e.stopImmediatePropagation();e.preventDefault();}else if(e.target.closest?.('[data-command-help]')&&['Enter',' '].includes(e.key)){show(e.target.closest('[data-command-help]'));e.preventDefault();e.stopImmediatePropagation();}},true);
 document.addEventListener('scroll',hide,true);window.addEventListener('resize',hide);document.addEventListener('fullscreenchange',hide);
 const help=document.createElement('button');help.className='command-help-info';help.type='button';help.textContent='Dicas';help.setAttribute('aria-label','Como usar as dicas de comandos');help.dataset.commandHelp='Passe o mouse sobre os trechos com sublinhado pontilhado. No celular, toque. Pelo teclado, use Tab para focar. Esc fecha o balão. Comandos, opções e argumentos têm explicações próprias; o texto copiado permanece igual.';
 const bar=document.querySelector('.top-actions,.topbar .actions,.toolbar .actions');if(bar)bar.append(help);else {help.style.cssText='position:fixed;right:12px;bottom:80px;z-index:1000';document.body.append(help);}
 scan(document.body);
 let pending=new Set(),scheduled=false;
 const observer=new MutationObserver(records=>{for(const r of records){const el=r.target.nodeType===1?r.target:r.target.parentElement;if(!el||el.closest('#command-help-bubble,[data-command-help]'))continue;const root=el.closest(selector);if(root)pending.add(root);for(const n of r.addedNodes)if(n.nodeType===1&&!n.matches('[data-command-help]'))pending.add(n);}if(pending.size&&!scheduled){scheduled=true;queueMicrotask(()=>{observer.disconnect();for(const el of pending)if(el.isConnected)scan(el);pending.clear();scheduled=false;observer.observe(document.body,{childList:true,subtree:true,characterData:true});});}});
 observer.observe(document.body,{childList:true,subtree:true,characterData:true});
})();
