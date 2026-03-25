import React, { useState, useMemo, memo } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
    Stack,
    Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function detectCodeLanguage(category, code) {
    const c = (category || '').toLowerCase();
    const codeTrim = (code || '').trim();

    if (c.includes('sql')) return 'sql';
    if (c.includes('java')) return 'java';
    if (c.includes('git')) return 'bash';
    if (c.includes('http')) return 'http';
    if (codeTrim.startsWith('{') || codeTrim.startsWith('[')) return 'json';

    if (codeTrim.includes('System.out.println') || codeTrim.includes('class ')) return 'java';

    if (
        codeTrim.includes('SELECT ') ||
        codeTrim.includes('INSERT ') ||
        codeTrim.includes('UPDATE ') ||
        codeTrim.includes('DELETE ') ||
        codeTrim.includes('CREATE VIEW')
    ) {
        return 'sql';
    }

    if (codeTrim.includes('curl ') || codeTrim.includes('HTTP/1.1')) return 'http';

    return '';
}

function looksLikeCodeLine(line = '') {
    const trimmed = line.trim();

    if (!trimmed) return false;

    return (
        trimmed.endsWith('{') ||
        trimmed === '}' ||
        trimmed === '};' ||
        trimmed.includes('();') ||
        trimmed.includes('System.out.') ||
        trimmed.includes('console.log') ||
        trimmed.includes('SELECT ') ||
        trimmed.includes('INSERT ') ||
        trimmed.includes('UPDATE ') ||
        trimmed.includes('DELETE ') ||
        trimmed.includes('CREATE ') ||
        trimmed.includes('FROM ') ||
        trimmed.includes('WHERE ') ||
        trimmed.includes('class ') ||
        trimmed.includes('public ') ||
        trimmed.includes('private ') ||
        trimmed.includes('protected ') ||
        trimmed.includes('void ') ||
        trimmed.includes('return ') ||
        trimmed.includes('extends ') ||
        trimmed.includes('implements ') ||
        trimmed.includes('super(') ||
        trimmed.includes('this.') ||
        /^<\/?[a-z][\s\S]*>/i.test(trimmed) ||
        /^[\w$]+\s*\(.*\)\s*\{?$/.test(trimmed)
    );
}

function normalizeAnswerToMarkdown(answer = '', category = '') {
    if (!answer) return '';

    if (answer.includes('```')) {
        return answer;
    }

    const markerMatch = answer.match(/([\s\S]*?)(\n(?:Код|Пример):\n)([\s\S]*)/i);

    if (markerMatch) {
        const textPart = markerMatch[1].trim();
        const marker = markerMatch[2].trim();
        const codePart = markerMatch[3].trim();
        const lang = detectCodeLanguage(category, codePart);

        return `${textPart}\n\n${marker}\n\n\`\`\`${lang}\n${codePart}\n\`\`\``;
    }

    const lines = answer.split('\n');
    let firstCodeIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const current = lines[i];
        const next = lines[i + 1] || '';

        if (looksLikeCodeLine(current) && (looksLikeCodeLine(next) || next.trim() === '' || i > 0)) {
            firstCodeIndex = i;
            break;
        }
    }

    if (firstCodeIndex !== -1) {
        const textPart = lines.slice(0, firstCodeIndex).join('\n').trim();
        const codePart = lines.slice(firstCodeIndex).join('\n').trim();
        const lang = detectCodeLanguage(category, codePart);

        if (textPart) {
            return `${textPart}\n\n\`\`\`${lang}\n${codePart}\n\`\`\``;
        }

        return `\`\`\`${lang}\n${codePart}\n\`\`\``;
    }

    return answer;
}

const QuestionCard = ({ question }) => {
    const [expanded, setExpanded] = useState(false);

    const markdown = useMemo(() => {
        if (!expanded) {
            return '';
        }

        return question.normalizedAnswer || normalizeAnswerToMarkdown(question.answer, question.category);
    }, [expanded, question.answer, question.category, question.normalizedAnswer]);

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            sx={{
                background:
                    'linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0.018))',
                border: '1px solid rgba(255,255,255,0.055)',
                boxShadow: 'none',
                borderRadius: '10px !important',
                overflow: 'hidden',
                transition: 'transform 0.18s ease, border-color 0.18s ease, background 0.18s ease',
                '&:hover': {
                    transform: 'translateY(-1px)',
                    borderColor: 'rgba(139,92,246,0.24)',
                    background:
                        'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.022))',
                },
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                    }}
                >
                    {question.title}
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                {!!question.tags?.length && (
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
                        {question.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Stack>
                )}

                {expanded && (
                    <Box
                        sx={{
                            color: 'text.secondary',
                            lineHeight: 1.8,
                            '& p': { mb: 2, mt: 0 },
                            '& ul, & ol': { pl: 3, mb: 2 },
                            '& li': { mb: 0.5 },
                            '& code': {
                                fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
                            },
                            '& pre': {
                                m: 0,
                            },
                            '& table': {
                                width: '100%',
                                borderCollapse: 'collapse',
                                mb: 2,
                                overflow: 'hidden',
                                borderRadius: 2,
                            },
                            '& th, & td': {
                                border: '1px solid rgba(255,255,255,0.08)',
                                padding: '10px 12px',
                                textAlign: 'left',
                            },
                            '& th': {
                                backgroundColor: 'rgba(255,255,255,0.04)',
                            },
                        }}
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ inline, className, children, ...props }) {
                                    const rawCode = String(children).replace(/\n$/, '');
                                    const match = /language-(\w+)/.exec(className || '');
                                    const detectedLanguage =
                                        match?.[1] || detectCodeLanguage(question.category, rawCode);

                                    if (inline) {
                                        return (
                                            <Box
                                                component="code"
                                                sx={{
                                                    px: 0.75,
                                                    py: 0.25,
                                                    borderRadius: 1,
                                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                                    fontSize: '0.9em',
                                                }}
                                                {...props}
                                            >
                                                {children}
                                            </Box>
                                        );
                                    }

                                    return (
                                        <Box sx={{ mb: 2 }}>
                                            <SyntaxHighlighter
                                                language={detectedLanguage || 'text'}
                                                style={oneDark}
                                                PreTag="div"
                                                customStyle={{
                                                    margin: 0,
                                                    borderRadius: '10px',
                                                    padding: '16px',
                                                    background: '#0b1020',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    overflowX: 'auto',
                                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                                                }}
                                                codeTagProps={{
                                                    style: {
                                                        fontFamily:
                                                            '"JetBrains Mono", "Fira Code", "Consolas", monospace',
                                                        fontSize: '0.95rem',
                                                    },
                                                }}
                                                {...props}
                                            >
                                                {rawCode}
                                            </SyntaxHighlighter>
                                        </Box>
                                    );
                                },
                                h1: ({ children }) => (
                                    <Typography variant="h5" sx={{ mt: 2, mb: 1.5 }}>
                                        {children}
                                    </Typography>
                                ),
                                h2: ({ children }) => (
                                    <Typography variant="h6" sx={{ mt: 2, mb: 1.5 }}>
                                        {children}
                                    </Typography>
                                ),
                                h3: ({ children }) => (
                                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                                        {children}
                                    </Typography>
                                ),
                                p: ({ children }) => (
                                    <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
                                        {children}
                                    </Typography>
                                ),
                                li: ({ children }) => (
                                    <li>
                                        <Typography variant="body1" component="span">
                                            {children}
                                        </Typography>
                                    </li>
                                ),
                                blockquote: ({ children }) => (
                                    <Box
                                        sx={{
                                            borderLeft: '3px solid',
                                            borderColor: 'primary.main',
                                            pl: 2,
                                            py: 0.8,
                                            my: 2,
                                            opacity: 0.95,
                                            backgroundColor: 'rgba(255,255,255,0.02)',
                                            borderRadius: 1.5,
                                        }}
                                    >
                                        {children}
                                    </Box>
                                ),
                            }}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </Box>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default memo(QuestionCard);