%% LaTeX document class for formatting electronics datasheets.
%%
%% Copyright 2020 Petteri Aimonen
%%
%% https://github.com/PetteriAimonen/latex-datasheet-template/
%%
%% --------------------------------------------------------------------------
%% 
%% This work may be distributed and/or modified under the
%% conditions of the LaTeX Project Public License, either version 1.3
%% of this license or (at your option) any later version.
%% The latest version of this license is in
%%   http://www.latex-project.org/lppl.txt
%% and version 1.3 or later is part of all distributions of LaTeX
%% version 2003/12/01 or later.
%% 
%% This work has the LPPL maintenance status "maintained".
%% 
%% This Current Maintainer of this work is Petteri Aimonen.
%% 
%% This work consists of the file datasheet.cls and the example
%% document example.tex.

\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{datasheet}[2020/11/13 LaTeX document class for datasheets]

% The class is based on the twocolumn article class.
\DeclareOption*{\PassOptionsToClass{\CurrentOption}{article}}
\ProcessOptions\relax
\LoadClass[twocolumn]{article}

% Useful symbol and color definitions
\RequirePackage{gensymb}
\RequirePackage{xcolor}

% These packages allow full-width tables and combining cells in tables.
\RequirePackage{multirow}
\RequirePackage{multicol}
\RequirePackage{tabularx}
\RequirePackage{threeparttable}

% Align figure and table captions to left.
\RequirePackage[font=bf, skip=5pt, justification=raggedright, format=hang, singlelinecheck=off]{caption}

% Format hyperlinks as blue and set PDF title based on \title{} in the document.
\RequirePackage[pdfusetitle]{hyperref}
\hypersetup{
    pdftex,
    breaklinks=true,
    colorlinks=true,
    linkcolor=.,
    urlcolor=blue,
    pdfsubject={Minecraft Encoded Storage}
}

% Configure page margins
\RequirePackage{geometry}
\geometry{left=2cm, top=2cm, right=2cm, bottom=3cm}

% Command to set tags
\gdef\@tags{}
\newcommand{\tags}[1]{
    \gdef\@tags{#1}
    \hypersetup{
        pdfkeywords={#1}
    }
}


% Command \revision{} can be used to include a document revision number in footer.
\gdef\@revision{}
\newcommand{\revision}[1]{\gdef\@revision{#1}}

% First page title layout is defined here
\renewcommand{\maketitle}{%
    \twocolumn[%
        {\Large \href{https://discord.gg/rJ4W8RHrhe}{\color{black}{Soontech Annals}}}
        \vspace{0.3cm}\\
        {\Huge\sffamily\bfseries\@title}
        \vspace{0.2cm}
        \\
        \sffamily{\bfseries By}: {\@author}\\
        \sffamily{\bfseries Tags}: {\@tags}\\
        \noindent\rule{\textwidth}{1pt}
        \medskip
        ]%
        \pagestyle{normalpage}
        \thispagestyle{firstpage}
}

% First page has footer but no header
\RequirePackage{fancyhdr}
\RequirePackage{lastpage}
\fancypagestyle{firstpage}{
    \fancyhf{}
    \renewcommand{\headrulewidth}{0pt}
    \renewcommand{\footrulewidth}{0.5pt}
    \fancyfoot[L]{\@revision}
    \fancyfoot[C]{\@date}
    \fancyfoot[R]{Page \thepage\ of \pageref{LastPage}}
}

% Rest of the pages have both header and footer
\fancypagestyle{normalpage}{
    \renewcommand{\headrulewidth}{0.5pt}
    \renewcommand{\footrulewidth}{0.5pt}
    \fancyhead[L]{\href{https://discord.gg/rJ4W8RHrhe}{\color{black}{Soontech Annals}}}
    \fancyhead[C]{\slshape\@title}
    \fancyhead[R]{\@date}
    \fancyfoot[L]{\@revision}
    \fancyfoot[C]{\@date}
    \fancyfoot[R]{Page \thepage\ of \pageref{LastPage}}
}

% No line above footnotes
\renewcommand\footnoterule{}

% Section header size and spacing
\renewcommand{\section}{%
    \@startsection
    {section}{1}{0pt}{-3.5ex plus -2ex minus -1ex}%
    {2.5ex plus .5ex}{\Large\bfseries\sffamily}%
}

% Spacing between paragraphs
\setlength{\parskip}{2ex plus 0.5ex minus 0.2ex}
\setlength{\parindent}{0pt}

% Spacing for tables.
% Other alternative is to use booktabs package, but I think normal LaTeX tables
% are more fitting in the usual data sheet style.
\renewcommand{\arraystretch}{1.5}
\newcommand{\thickhline}{\noalign {\ifnum 0=`}\fi \hrule height 1pt \futurelet \reserved@a \@xhline}

% No numbering for section titles
\setcounter{secnumdepth}{0}