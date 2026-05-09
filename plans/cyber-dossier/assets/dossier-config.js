const DOSSIER_CONFIG = {
    // ===== 顶层信息 =====
    caseId: "CD-0427",
    targetAlias: "[目标代号]",
    investigatorAlias: "[调查员代号]",
    passcode: "心动",

    // ===== 页面视觉主题 =====
    themes: {
        access:    { accent: "#18ffd6", termTitle: "SYSTEM BOOT",  termLabel: "加密信道 · 在线" },
        briefing:  { accent: "#ffd166", termTitle: "CLEARANCE",    termLabel: "身份验证" },
        evidence:  { accent: "#18ffd6", termTitle: "EVIDENCE",     termLabel: "配对模式" },
        intercept: { accent: "#ff6b9d", termTitle: "SIGNAL",       termLabel: "需要破译序列" },
        reconstruction: { accent: "#ffd166", termTitle: "TIMELINE", termLabel: "拖拽排序" },
        verdict:   { accent: "#18ffd6", termTitle: "CASE CLOSED",  termLabel: "档案封存" }
    },

    // ===== 通关评价 =====
    rating: {
        S: { label: "S · 完美调查", desc: "零失误通关。你不仅了解目标，你一直在认真对待这份感情。", color: "#ffd166" },
        A: { label: "A · 出色调查", desc: "少量失误，但整体表现出色。目标一定会被你的用心打动。", color: "#18ffd6" },
        B: { label: "B · 合格调查", desc: "有些犹豫，但终究没有放弃。感情就是这样，不需要完美。", color: "#18ffd6" },
        C: { label: "C · 勉强通关", desc: "系统帮你补了不少漏洞。但没关系，最重要的是你来了。", color: "var(--muted)" }
    },

    // ===== 叙事配置 =====
    narrative: {
        // 每页开头的叙事桥接文本（终端逐字打印）
        bridges: [
            "",  // 00-access 无桥接，直接进入
            "接入确认完毕。系统已将你标记为二级观察员。现在，请证明你足够了解目标——不是作为调查员，而是作为在意TA的人。",
            "身份验证通过。系统确认：你确实很在意这个人。接下来，请分析以下证据——它们来自你对目标的长期观察。",
            "证据链闭合。所有线索都指向同一结论。系统截获到一段加密信号，需要你来破译。密码隐藏在情感数据中。",
            "信号破译完成。系统检测到调查员情感波动显著上升。接下来，请还原事件发生的时间线——从第一次注意到认真在意。",
            "时间线还原完毕。系统已收集全部证据和情感数据。正在生成最终结案报告……"
        ],
        // AI助手终端评论
        assistant: {
            correct: [
                "系统分析：回答正确。数据库与你的记忆一致。",
                "系统分析：确认。这个答案……很准确。",
                "系统分析：匹配成功。你比系统更了解目标。"
            ],
            wrong: [
                "系统注：回答与数据库不符。但系统理解——有时候记忆会自我保护。",
                "系统注：不完全正确。系统给你一次重新审视的机会。",
                "系统注：数据库显示不同结果。不过，诚实比正确更重要。"
            ],
            hint: "系统注：如果遇到困难，试着回想你们相处的细节。答案就在那里。",
            perfect: "系统评价：完美调查。你不仅了解目标，你一直在认真对待这份感情。",
            complete: "系统注：调查结束。系统建议：停止用调查当借口，直接告诉TA。——当然，这只是系统的一厢情愿。"
        }
    },

    // ===== 页面配置 =====
    pages: {

        // ── 接入页 ──
        access: {
            headline: "机密档案 · 接入确认",
            intro: "你被临时调入一桩异常档案。系统声称目标并不危险，只是过分值得注意。",
            subIntro: "本调查不涉及危险品、财务诈骗或世界末日。它只涉及一个人为什么总能精准占用你的注意力。",
            bootLines: [
                { text: "> 正在初始化加密信道...", className: "terminal-line warn" },
                { text: "> 加载目标代号：[target]", className: "terminal-line" },
                { text: "> 扫描公开记录...", className: "terminal-line" },
                { text: "> 记录数据库：无可疑条目（但心跳频率异常）", className: "terminal-line error" },
                { text: "> 建议：继续调查。注意，你可能会在其中看到自己。", className: "terminal-line" }
            ],
            enterLabel: "接入案件",
            nextLabel: "下一步：任务简报"
        },

        // ── 任务简报 ──
        briefing: {
            clearanceLabel: "权限等级：二级观察员",
            instruction: "目标档案已加密。你需要回答3个关于目标的问题来解锁档案卡。答对才能读取档案内容。",
            questionLabel: "身份验证题",
            decryptBtnLabel: "提交答案",
            encryptedLabel: "███ 档案加密中 ███",
            initialNotice: "3 道验证题待完成。调查员，请证明你足够了解目标。",
            progressNotice: "已完成 {done}/3 题。",
            correctNotice: "回答正确。档案解锁中...",
            wrongNotice: "回答错误。你确定你了解这个人吗？还剩 {retries} 次机会。",
            wrongFinalNotice: "答案不正确，但系统决定给你一次机会。档案已强制解锁。",
            completeNotice: "全部验证通过。身份确认完毕——你确实很在意这个人。",
            briefing: [
                ["目标特征", "出现时通常伴随注意力偏移、语气变轻、计划被重新排序。"],
                ["风险等级", "低危。主要风险是让调查员开始认真保存细节。"],
                ["行动建议", "保持冷静，继续调查，不要在第一份简报就承认自己很在意。"]
            ],
            // 验证问答——答对才解锁对应档案卡
            questions: [
                {
                    question: "目标在以下哪个场景中出现的频率最高？",
                    options: ["深夜的聊天窗口", "工作邮件", "会议日程", "购物清单"],
                    answer: 0,
                    scanIndex: 0,
                    hint: "提示：那个你总说'最后一条消息'却永远收不了尾的地方。"
                },
                {
                    question: "以下哪个行为最能描述你对目标的关注模式？",
                    options: ["偶尔想起", "定期检查", "不自觉地优先处理", "完全不在意"],
                    answer: 2,
                    scanIndex: 1,
                    hint: "提示：某些消息会自动插队，假装公平已经失败。"
                },
                {
                    question: "系统检测到目标出现后，你的哪项数据变化最明显？",
                    options: ["工作效率提升", "噪声感知降低", "睡眠时间增加", "食欲下降"],
                    answer: 1,
                    scanIndex: 2,
                    hint: "提示：目标出现后，世界变得安静了 37%。"
                }
            ]
        },

        // ── 证据墙 ──
        evidence: {
            instruction: "6条证据被打乱，分为「线索」和「推论」两类。你需要将每条线索与对应的推论配对。点击一张卡片选中，再点击另一张尝试配对。",
            initialNotice: "3 对关联待配对。点击卡片开始配对。",
            progressNotice: "已配对 {done}/3 对。",
            matchSuccessNotice: "配对成功！",
            matchFailNotice: "关联性不足。这两条证据之间没有直接联系，重新分析。",
            completeNotice: "全部配对完成。证据链闭环——所有线索都指向同一个结论。",
            clues: [
                ["A01", "反复出现的聊天窗口", "频率异常，但调查员从未主动关闭。"],
                ["B14", "被记住的小习惯", "系统判定：这不是巧合，是长期观察的结果。"],
                ["C09", "优先级上调记录", "某些消息会自动插队，假装公平已经失败。"],
                ["D22", "情绪稳定装置", "目标出现后，环境噪声感知降低 37%。"],
                ["E07", "未提交的解释", "调查员多次试图说清原因，均被沉默取代。"],
                ["F11", "最终指向", "全部线索指向同一目标。令人遗憾，系统也磕到了。"]
            ],
            // 配对关系：线索 → 推论
            pairs: [
                {
                    clue: "A01",
                    conclusion: "C09",
                    matchText: "她发消息时，你的回复速度总是异常——因为她的消息永远排在第一位。"
                },
                {
                    clue: "B14",
                    conclusion: "D22",
                    matchText: "你记住了她喝咖啡不加糖，然后自己也戒了糖——因为她的习惯变成了你的习惯。"
                },
                {
                    clue: "E07",
                    conclusion: "F11",
                    matchText: "那些没说出口的话，其实全都写在了行为里——每一个细节都在指向同一个人。"
                }
            ]
        },

        // ── 信号截获 ──
        intercept: {
            instruction: "截获到一段加密信号。密码是「心动」——但需要完成3个节点的挑战来逐段破译。每个节点会揭示密码的一部分。",
            hint: "提示：密码是一个两字词语，描述调查员面对目标时的核心反应。",
            decoded: "信号破译完成。截获内容：所有看似冷静的记录，最终都在说明一件事——你很特别。",
            packetLines: [
                { text: "> 信号哈希：7A-1F-CC-09", className: "terminal-line" },
                { text: "> 有效载荷：[已加密]", className: "terminal-line" },
                { text: "> 检测到人类情感干扰", className: "terminal-line warn" },
                { text: "> 等待破译序列...", className: "terminal-line" }
            ],
            failNotice: "破译序列不匹配。系统没有生气，只是很冷静地拒绝了。",
            successNotice: "破译完成。建议不要在终端前微笑，摄像头可能会记录。",
            segments: [
                {
                    label: "频率校准",
                    type: "sequence",
                    hint: "按情绪强度从低到高排列：平静 → 紧张 → 心跳加速",
                    buttons: ["心跳加速", "平静", "紧张"],
                    answer: [1, 2, 0],
                    chars: "心"
                },
                {
                    label: "信号锁定",
                    type: "tap",
                    hint: "目标正在发送信号，及时回应（点击锁定 3 次）",
                    targetTaps: 3,
                    chars: "动"
                }
            ]
        },

        // ── 事件重构 ──
        reconstruction: {
            instruction: "4个事件被打乱顺序。将它们拖拽到时间线的正确位置上，还原事件发生的真实顺序。如果拖错了位置，卡片会弹回——请从最早的事件开始推理。",
            initialNotice: "将事件卡片拖拽到时间线的正确位置。",
            progressNotice: "第 {step} 步时序确认。",
            completeNotice: "事件重构完成。时间线还原完毕——从第一次注意到认真在意，一切都对得上。",
            errorNotice: "时序冲突。这个事件发生的时间不对，请重新推理。",
            resetNotice: "时间线已重置。冷静很好，重新来过也很好。",
            maxErrors: 5,
            errorCountNotice: "已出错 {errors} 次。超过 {max} 次系统将给出提示。",
            hintNotice: "系统提示：从「目标进入视野」开始，到「承认异常」结束。",
            correctOrder: ["observe", "notice", "save", "admit"],
            scenes: {
                save: ["03", "保存细节", "系统发现调查员开始记住一些无关紧要但又很重要的小事。"],
                observe: ["01", "首次观察", "目标进入视野。调查员声称只是普通记录。系统保留意见。"],
                admit: ["04", "承认异常", "所有证据闭环：这不是巧合，是认真在意。"],
                notice: ["02", "频繁注意", "目标出现频率上升。调查员打开消息的速度不符合冷静人设。"]
            }
        },

        // ── 结案报告 ──
        verdict: {
            verdictTitle: "结案报告",
            targetLabel: "档案对象：",
            finalLines: [
                "调查结论：目标不是异常。",
                "异常的是调查员不断把注意力交给同一个人。",
                "系统建议：停止伪装冷静，正式承认这份特别。"
            ],
            initialLines: [
                { text: "> 报告缓冲区为空", className: "terminal-line warn" },
                { text: "> 点击「打印结论」生成结案报告", className: "terminal-line" }
            ],
            printLabel: "打印结论",
            printedLabel: "报告已打印",
            restartLabel: "重新调查",
            deepScanHint: "⚡ 深度扫描模式已激活。点击高亮文字，发现隐藏在报告中的真心话。",
            eggsFound: "已发现 {found}/{total} 条隐藏信息",
            allEggsFound: "全部隐藏信息已解锁。你发现了档案中所有的真心话。",
            easterEggs: [
                {
                    trigger: "click",
                    text: "异常",
                    reveal: "其实这一切都不是系统分析出来的，是我一点一点记住的。"
                },
                {
                    trigger: "click",
                    text: "特别",
                    reveal: "彩蛋：这份档案的每一句话，都是我想对你说但没好意思当面说的话。"
                },
                {
                    trigger: "click",
                    text: "调查员",
                    reveal: "终极彩蛋：你愿意做我的永久调查对象吗？"
                }
            ]
        }
    },

    // ===== 第二案（通关后解锁）=====
    case2: {
        caseId: "CD-0514",
        targetAlias: "同一个目标",
        passcode: "永远",
        rating: {
            S: { label: "S · 深层确认", desc: "零失误完成第二案。系统确认：这不是短暂异常，是长期稳定的喜欢。", color: "#ffb75e" },
            A: { label: "A · 记忆清晰", desc: "少量波动，但关键记忆全部对上。你确实把TA放进了很重要的位置。", color: "#74efff" },
            B: { label: "B · 未来可期", desc: "有些犹豫，但方向没有偏。系统建议继续靠近，不要只靠推理。", color: "#74efff" },
            C: { label: "C · 数据待补全", desc: "答案不够稳定，但心意已经足够明显。下一步，交给真实行动。", color: "var(--muted)" }
        },
        narrative: {
            bridges: [
                "",
                "第一案已结案。但系统检测到新的异常——关于目标的记忆数据正在快速增长。开启深入调查。",
                "深层记忆已提取。这些不是系统生成的数据，是调查员自己积累的证据。",
                "信号强度超出预期。这段加密信息藏在调查员最深的情感层中。",
                "时间线延伸至未来。系统正在模拟所有可能的分支……",
                "调查完成。两份档案已合并。最终结论只有一个。"
            ],
            assistant: {
                correct: ["系统分析：记忆数据匹配。这是真实的。", "系统分析：确认。这条记忆的情感权重极高。"],
                wrong: ["系统注：记忆出现偏差。但偏差本身也是数据。", "系统注：不确定？没关系，感情本来就不是确定的东西。"],
                perfect: "系统评价：两份档案，同一个结论。系统正式建议：不要再调查了，去告白吧。",
                complete: "系统注：所有数据已归档。系统运行了这么久，第一次希望一个调查永远不要结束。"
            }
        },
        pages: {
            briefing: {
                clearanceLabel: "权限等级：核心调查员",
                instruction: "深层档案已解锁。回答3个问题，解锁被封存的记忆。",
                initialNotice: "3 道深层验证题。这一次，没有提示。",
                progressNotice: "已完成 {done}/3 题。",
                correctNotice: "记忆确认。",
                wrongNotice: "记忆模糊。还有 {retries} 次机会。",
                wrongFinalNotice: "记忆已强制恢复。",
                completeNotice: "深层记忆全部解锁。系统检测到：这些记忆全部与同一目标相关。",
                briefing: [
                    ["记忆碎片 #1", "第一次心动的瞬间，系统记录到多巴胺分泌量异常。"],
                    ["记忆碎片 #2", "目标不在身边时，调查员的注意力搜索模式发生改变。"],
                    ["记忆碎片 #3", "系统预测：如果继续保持当前趋势，调查员将在某个时刻采取行动。"]
                ],
                questions: [
                    {
                        question: "以下哪个时刻，你对目标的感受最强烈？",
                        options: ["TA笑的时候", "TA认真的时候", "TA说'想你'的时候", "以上全部"],
                        answer: 3, scanIndex: 0,
                        hint: "提示：系统检测到你在所有时刻的心跳都异常。"
                    },
                    {
                        question: "如果可以，你最想对目标说什么？",
                        options: ["我喜欢你", "我想和你在一起", "你是我最重要的人", "以上全部，还有更多"],
                        answer: 3, scanIndex: 1,
                        hint: "提示：系统分析显示，你的情感复杂度超出了选项范围。"
                    },
                    {
                        question: "系统预测你接下来会做什么？",
                        options: ["继续观察", "保持现状", "鼓起勇气告诉TA", "假装什么都没发生"],
                        answer: 2, scanIndex: 2,
                        hint: "提示：系统已经帮你准备好了这份档案。你知道该怎么做。"
                    }
                ]
            },
            evidence: {
                instruction: "深层证据已提取。将记忆碎片与情感结论配对。",
                initialNotice: "3 对深层关联待配对。",
                progressNotice: "已配对 {done}/3 对。",
                matchSuccessNotice: "记忆关联确认。",
                matchFailNotice: "关联性不足。重新检索。",
                completeNotice: "深层证据链闭合。所有记忆都指向同一方向。",
                clues: [
                    ["M01", "心跳加速记录", "每当目标靠近，心率平均上升 23%。"],
                    ["M02", "未来计划变更", "调查员的长期计划中，目标的出现频率为 100%。"],
                    ["M03", "优先级重构", "目标已超越所有其他事项，成为默认最高优先级。"],
                    ["M04", "情绪基线漂移", "没有目标的日子里，整体情绪基线低于平均值。"],
                    ["M05", "记忆回放频率", "目标相关记忆的主动回放频率为每小时 4.7 次。"],
                    ["M06", "行为模式改变", "调查员开始做一些以前不会做的事，原因：想让TA开心。"]
                ],
                pairs: [
                    { clue: "M01", conclusion: "M03", matchText: "心跳加速 → 优先级重构：TA已经成为你生活的中心。" },
                    { clue: "M02", conclusion: "M05", matchText: "未来计划 → 记忆回放：你不仅在想现在，你在想有TA的未来。" },
                    { clue: "M04", conclusion: "M06", matchText: "情绪基线 → 行为改变：TA的快乐变成了你的快乐来源。" }
                ]
            },
            intercept: {
                instruction: "截获到来自未来的信号。密码是「永远」——完成两个节点来破译。",
                hint: "提示：密码描述的不是现在，是你希望的未来。",
                decoded: "未来信号破译完成。截获内容：如果这份档案能让你鼓起勇气，那系统存在的意义就实现了。",
                packetLines: [
                    { text: "> 信号来源：未来时间线", className: "terminal-line" },
                    { text: "> 有效载荷：[情感加密]", className: "terminal-line" },
                    { text: "> 检测到希望信号", className: "terminal-line warn" },
                    { text: "> 等待破译……", className: "terminal-line" }
                ],
                failNotice: "信号干扰。重新尝试。",
                successNotice: "破译完成。未来信号已确认。",
                segments: [
                    {
                        label: "时间校准",
                        type: "sequence",
                        hint: "按承诺的深度排列：喜欢 → 爱 → 永远",
                        buttons: ["永远", "喜欢", "爱"],
                        answer: [1, 2, 0],
                        chars: "永"
                    },
                    {
                        label: "未来锁定",
                        type: "tap",
                        hint: "确认你的承诺（点击锁定 2 次）",
                        targetTaps: 2,
                        chars: "远"
                    }
                ]
            },
            reconstruction: {
                instruction: "这条时间线不仅包含过去，还包含未来。将事件拖拽到正确位置。",
                initialNotice: "将事件卡片拖拽到时间线的正确位置。",
                progressNotice: "第 {step} 步确认。",
                completeNotice: "完整时间线已建立。从过去到未来，一切都指向同一个方向。",
                errorNotice: "时序冲突。重新推理。",
                resetNotice: "时间线已重置。",
                maxErrors: 5,
                hintNotice: "系统提示：从「第一次注意到现在」，到「想和TA有未来」。",
                correctOrder: ["past", "present", "decision", "future"],
                scenes: {
                    past:     ["01", "过去", "从第一次注意开始，就已经回不去了。"],
                    present:  ["02", "现在", "每一刻都在想TA，每一秒都想告诉TA。"],
                    decision: ["03", "决定", "鼓起勇气，不再让这份感情只藏在系统里。"],
                    future:   ["04", "未来", "想和TA一起，走过所有剩下的日子。"]
                }
            },
            verdict: {
                verdictTitle: "最终结论",
                targetLabel: "档案对象：",
                finalLines: [
                    "两份档案，同一个结论。",
                    "系统分析完毕：这不是异常，这是喜欢。",
                    "最终建议：关上屏幕，去找TA。"
                ],
                initialLines: [
                    { text: "> 两份档案合并中……", className: "terminal-line warn" },
                    { text: "> 点击「生成结论」查看最终分析", className: "terminal-line" }
                ],
                printLabel: "生成结论",
                printedLabel: "结论已生成",
                restartLabel: "重新开始",
                deepScanHint: "⚡ 深度扫描模式已激活。最后的真心话，藏在这些文字里。",
                eggsFound: "已发现 {found}/{total} 条隐藏信息",
                allEggsFound: "全部真心话已解锁。",
                easterEggs: [
                    { trigger: "click", text: "喜欢", reveal: "系统说「喜欢」太轻了。应该是：很喜欢、特别喜欢、只喜欢你。" },
                    { trigger: "click", text: "未来", reveal: "彩蛋：系统偷偷模拟了100种未来，每一种里都有TA。" },
                    { trigger: "click", text: "结论", reveal: "终极彩蛋：这份档案的密码是「永远」，而我想对你说的是——我喜欢你。" }
                ]
            }
        }
    }
};
