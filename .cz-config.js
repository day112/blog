module.exports = {
  types: [
    { value: 'feat', name: 'feat: 增加新功能' },
    { value: 'fix', name: 'fix: 修复bug' },
    { value: 'docs', name: 'docs: 只改动了文档相关的内容' },
    {
      value: 'style',
      name: 'style: 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号'
    },
    {
      value: 'refactor',
      name: 'refactor: 代码重构，不是修复BUG或者增加新功能'
    },
    {
      value: 'perf',
      name: 'perf:  提高性能的改动'
    },
    { value: 'test', name: 'test: 添加测试或者修改现有测试' },
    {
      value: 'chore',
      name: 'chore:  修改src或者test的其余修改，例如构建过程或辅助工具的变动'
    },
    { value: 'revert', name: 'revert:  执行git revert打印的message' },
    { value: 'CI', name: 'CI: 与CI（持续集成服务）有关的改动' }
  ],

  // scopes: [{ name: 'accounts' }, { name: 'admin' }, { name: 'exampleScope' }, { name: 'changeMe' }],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择您要提交的更改类型:',
    scope: '\n输入此次更改的范围(可选):',
    // used if allowCustomScopes is true
    customScope: '表示此更改的范围: ',
    subject: '提供此次变更的简要描述: \n',
    body: '提供此次变更的详细描述 (可选). 使用 | 来换行:\n',
    breaking: '列出破坏性变更 (可选):\n',
    footer: '列出此次要关闭的issue (可选)。 例如: #31, #34:\n',
    confirmCommit: '您确定要提交吗?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 100
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
