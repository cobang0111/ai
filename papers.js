window.ICLR_META = {
  title: "AI Automation Project",
  updated: "2026-04-18",
  note: "Research paper briefs based on local PDFs and source links.",
};

window.PAPER_LIBRARY_META = window.ICLR_META;

window.ICLR_PAPERS = [
  {
    id: "11163",
    title: "MemAgent: Reshaping Long-Context LLM with Multi-Conv RL-based Memory Agent",
    authors: [
      "Hongli Yu",
      "Tinghong Chen",
      "Jiangtao Feng",
      "Jiangjie Chen",
      "Weinan Dai",
      "Qiying Yu",
      "Ya-Qin Zhang",
      "Wei-Ying Ma",
      "Jingjing Liu",
      "Mingxuan Wang",
      "Hao Zhou",
    ],
    session: "Oral Session 1",
    slot: "24th 10:30-12:00",
    presentation: "Oral",
    priority: "high",
    status: "todo",
    pdf: "papers/ICLR2026/Oral Session 1 (24th 1030-1200)/11163_MemAgent_Reshaping_Long_.pdf",
    source: "https://openreview.net/forum?id=k5nIOvYGCL",
    tags: ["LLM", "memory", "long-context", "agent", "RL"],
    summary:
      "긴 문서를 세그먼트로 읽고 메모리를 덮어쓰며 갱신하는 에이전트 흐름을 RL로 최적화한다. 장기 문맥 extrapolation을 별도 메모리 관리 문제로 다루는 점이 핵심이다.",
    takeaways: [
      "메모리 업데이트 정책을 모델 워크플로의 중심 학습 대상으로 둔다.",
      "짧은 학습 컨텍스트에서 훨씬 긴 QA 설정으로 확장하는 실험을 강조한다.",
      "멀티 컨버세이션 생성과 DAPO 확장이 훈련 안정성에 어떤 역할을 하는지 확인할 만하다.",
    ],
    question: "Overwrite memory가 정보 손실과 추적 가능성에 어떤 trade-off를 만드는가?",
  },
  {
    id: "11338",
    title: "MLP Memory: A Retriever-Pretrained Memory for Large Language Models",
    authors: ["Rubin Wei", "Jiaqi Cao", "Jiarui Wang", "Jushi Kai", "Qipeng Guo", "Bowen Zhou", "Zhouhan Lin"],
    session: "Poster Session 1",
    slot: "24th 10:30-13:00",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 1 (24th 1030-1300)/11338_MLP_Memory_A_Retriever_P.pdf",
    source: "https://openreview.net/forum?id=1SMdxRtLBp",
    tags: ["LLM", "memory", "retrieval", "RAG", "parametric"],
    summary:
      "kNN retriever의 동작을 MLP 모듈에 사전학습시켜 검색 패턴을 파라메트릭 메모리로 내재화한다. RAG의 지연과 파인튜닝의 망각 사이를 줄이려는 접근이다.",
    takeaways: [
      "외부 문서 접근 없이 retrieval-like behavior를 모델 안에 넣는 설계다.",
      "Transformer decoder와 확률 보간 방식으로 붙이는 단순한 통합을 내세운다.",
      "RAG 대비 속도와 hallucination 감소 주장을 벤치마크별로 확인하면 좋다.",
    ],
    question: "새 지식 업데이트가 필요한 상황에서는 MLP Memory를 얼마나 자주 다시 학습해야 할까?",
  },
  {
    id: "1717",
    title: "MemoryVLA: Perceptual-Cognitive Memory in Vision-Language-Action Models for Robotic Manipulation",
    authors: [
      "Hao Shi",
      "Bin Xie",
      "Yingfei Liu",
      "Lin Sun",
      "Fengrong Liu",
      "Tiancai Wang",
      "Erjin Zhou",
      "Haoqiang Fan",
      "Xiangyu Zhang",
      "Gao Huang",
    ],
    session: "Poster Session 1",
    slot: "24th 10:30-13:00",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 1 (24th 1030-1300)/1717_MemoryVLA_Perceptual_Cogn.pdf",
    source: "https://openreview.net/forum?id=54U3XHf7qq",
    tags: ["robotics", "VLA", "memory", "long-horizon", "embodied AI"],
    summary:
      "로봇 조작에서 시간적 문맥을 다루기 위해 working memory와 perceptual-cognitive memory bank를 결합한다. 장기 과제에서 현재 관측과 과거 경험을 함께 쓰는 VLA 프레임워크다.",
    takeaways: [
      "인지과학의 working memory와 장기 기억 구분을 VLA 구조로 옮긴다.",
      "저수준 perceptual detail과 고수준 semantic gist를 함께 저장한다.",
      "시뮬레이션과 실제 로봇 실험의 실패 사례를 보면 적용 범위가 더 선명해질 듯하다.",
    ],
    question: "메모리 검색/병합이 실시간 제어 지연에 얼마나 영향을 주는가?",
  },
  {
    id: "18334",
    title:
      "RAIN-Merging: A Gradient-Free Method to Enhance Instruction Following in Large Reasoning Models with Preserved Thinking Format",
    authors: ["Zhehao Huang", "Yuhang Liu", "Baijiong Lin", "Yixin Lou", "Zhengbao He", "Hanling Tian", "Tao Li", "Xiaolin Huang"],
    session: "Oral Session 1",
    slot: "24th 10:30-12:00",
    presentation: "Oral",
    priority: "high",
    status: "todo",
    pdf: "papers/ICLR2026/Oral Session 1 (24th 1030-1200)/18334_RAIN_Merging_A_Gradient_.pdf",
    source: "https://openreview.net/forum?id=PO2iULmu5e",
    tags: ["LLM", "reasoning", "instruction following", "model merging", "alignment"],
    summary:
      "대형 reasoning model에 instruction-tuned model의 장점을 병합하되, thinking/response 형식을 보존하는 gradient-free 방법이다. Null-space projection과 instruction-attention scaling으로 간섭을 줄인다.",
    takeaways: [
      "LRM과 ITM의 task vector subspace가 거의 직교한다는 관찰에서 출발한다.",
      "생각 토큰의 forward feature null space로 투영해 reasoning format을 보존한다.",
      "agent setting에서도 instruction adherence 개선이 이어지는지 확인할 가치가 있다.",
    ],
    question: "형식 보존과 instruction following 개선이 서로 충돌하는 사례는 무엇인가?",
  },
  {
    id: "1991",
    title: "Steerable Adversarial Scenario Generation through Test-Time Preference Alignment",
    authors: ["Tong Nie", "Yuewen Mei", "Yihong Tang", "Junlin He", "Jie Sun", "Haotian Shi", "Wei Ma", "Jian Sun"],
    session: "Poster Session 1",
    slot: "24th 10:30-13:00",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 1 (24th 1030-1300)/1991_Steerable_Adversarial_Sce.pdf",
    source: "https://openreview.net/forum?id=lYNsZdKn5R",
    tags: ["autonomous driving", "adversarial", "preference alignment", "planning", "safety"],
    summary:
      "자율주행 adversarial scenario 생성을 다목적 preference alignment로 재정의한다. SAGE는 재학습 없이 inference 시점에 adversariality와 realism의 비율을 조절한다.",
    takeaways: [
      "고정 trade-off 모델 대신 테스트 시점 steerability를 제공한다.",
      "상반된 preference expert를 만들고 weight interpolation으로 정책 스펙트럼을 구성한다.",
      "닫힌 루프 driving policy 학습에서 실제 안전성 평가로 이어지는지 볼 만하다.",
    ],
    question: "현실성 realism 지표가 실제 도로 위험 분포를 충분히 반영하는가?",
  },
  {
    id: "23970",
    title: "PALC: Preference Alignment via Logit Calibration",
    authors: ["Sanghyun Lee", "Hoh Peter In"],
    session: "Poster Session 1",
    slot: "24th 10:30-13:00",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 1 (24th 1030-1300)/23970_PALC_Preference_Alignmen.pdf",
    source: "https://openreview.net/forum?id=0cmuYj3WeG",
    tags: ["alignment", "logits", "test-time", "LLM", "steering"],
    summary:
      "hidden representation을 직접 조작하지 않고 vocabulary logit 공간에서 preference calibration을 적용한다. frozen LLM에 작고 해석 가능한 test-time alignment 레이어를 붙이는 방식이다.",
    takeaways: [
      "logit 차원이 토큰과 직접 대응한다는 점을 활용해 intervention을 단순화한다.",
      "스케일링 계수 하나로 alignment 강도를 런타임에 조정한다.",
      "guided decoding 대비 지연이 낮다는 주장을 실제 serving 관점에서 확인하고 싶다.",
    ],
    question: "토큰 단위 logit calibration이 장문 생성의 전역 선호를 얼마나 안정적으로 유지할까?",
  },
  {
    id: "24355",
    title: "PERK: Long-Context Reasoning as Parameter-Efficient Test-Time Learning",
    authors: ["Zeming Chen", "Angelika Romanou", "Gail Weiss", "Antoine Bosselut"],
    session: "Poster Session 1",
    slot: "24th 10:30-13:00",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 1 (24th 1030-1300)/24355_PERK_Long_Context_Reason.pdf",
    source: "https://openreview.net/forum?id=qxDTe8fIyA",
    tags: ["LLM", "long-context", "test-time learning", "LoRA", "meta-learning"],
    summary:
      "긴 컨텍스트를 테스트 시점 gradient update로 LoRA 어댑터에 빠르게 인코딩하고, 바깥 루프에서 이를 활용해 recall/reasoning하도록 meta-training한다.",
    takeaways: [
      "LoRA를 장기 컨텍스트용 파라메트릭 메모리로 쓰는 발상이 흥미롭다.",
      "관련 정보 위치와 reasoning complexity에 대한 robustness 분석을 강조한다.",
      "테스트 시점 업데이트 비용과 실제 온라인 사용 가능성을 체크해야 한다.",
    ],
    question: "컨텍스트마다 어댑터를 업데이트할 때 캐싱과 보안 격리는 어떻게 처리할 수 있을까?",
  },
  {
    id: "6247",
    title: "TokMem: One-Token Procedural Memory for Large Language Models",
    authors: ["Zijun Wu", "Yongchang Hao", "Lili Mou"],
    session: "Poster Session 1",
    slot: "24th 10:30-13:00",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 1 (24th 1030-1300)/6247_TokMem_One_Token_Procedur.pdf",
    source: "https://openreview.net/forum?id=RWjEf9PdiJ",
    tags: ["LLM", "procedural memory", "tokens", "continual adaptation", "prompting"],
    summary:
      "반복 사용되는 절차를 하나의 trainable memory token으로 컴파일한다. 프롬프트를 매번 다시 읽는 비용을 줄이고, frozen backbone에 절차 지식을 모듈식으로 추가한다.",
    takeaways: [
      "메모리 토큰이 procedure index이자 generation control signal로 동작한다.",
      "새 절차를 추가해도 기존 절차 간섭을 줄이는 continual adaptation을 내세운다.",
      "RAG prompting과 PEFT 대비 토큰/파라미터 효율 비교가 핵심 체크포인트다.",
    ],
    question: "절차가 복합적이거나 충돌할 때 one-token memory가 충분한 표현력을 갖는가?",
  },
  {
    id: "746",
    title: "VerifyBench: Benchmarking Reference-based Reward Systems for Large Language Models",
    authors: [
      "Yuchen Yan",
      "Jin Jiang",
      "Zhenbang Ren",
      "Yijun Li",
      "Xudong Cai",
      "Yang Liu",
      "Xin Xu",
      "Mengdi Zhang",
      "Jian Shao",
      "Yongliang Shen",
      "Jun Xiao",
      "Yueting Zhuang",
    ],
    session: "Poster Session 1",
    slot: "24th 10:30-13:00",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 1 (24th 1030-1300)/746_VerifyBench_Benchmarking_R.pdf",
    source: "https://openreview.net/forum?id=JfsjGmuFxz",
    tags: ["benchmark", "reward model", "verification", "RL", "reasoning"],
    summary:
      "LLM RL 훈련에서 정답 reference를 기준으로 출력을 검증하는 reward system을 평가하는 벤치마크다. VerifyBench-Hard를 통해 현 verifier의 취약 사례를 드러낸다.",
    takeaways: [
      "응답 선호 비교가 아니라 ground-truth reference 검증 능력에 초점을 둔다.",
      "모델 기반 verifier가 표준 케이스와 hard 케이스에서 어떻게 갈리는지 분석한다.",
      "RLVR/Reasoning 모델 학습 파이프라인 평가 기준으로 연결하기 좋다.",
    ],
    question: "reference가 여러 올바른 풀이를 허용하는 문제에서 verifier 평가는 얼마나 안정적인가?",
  },
  {
    id: "8572",
    title: "Think-While-Generating: On-the-Fly Reasoning for Personalized Long-Form Generation",
    authors: ["Chengbing Wang", "Yang Zhang", "Wenjie Wang", "Xiaoyan Zhao", "Fuli Feng", "Xiangnan He", "Tat-Seng Chua"],
    session: "Poster Session 1",
    slot: "24th 10:30-13:00",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 1 (24th 1030-1300)/8572_Think_While_Generating_On.pdf",
    source: "https://openreview.net/forum?id=lle0aGQyQb",
    tags: ["LLM", "personalization", "reasoning", "long-form generation", "alignment"],
    summary:
      "개인화 장문 생성에서 reasoning을 응답 전에 한 번 끝내는 대신, 별도 reasoning model이 latent token-level reasoning을 병렬 생성해 generation model에 계속 주입한다.",
    takeaways: [
      "FlyThinker는 reasoning과 generation을 동시에 진행해 긴 출력 중 변화하는 문맥에 대응한다.",
      "reasoning model이 이전 응답에만 의존하도록 설계해 학습 병렬성을 유지한다.",
      "개인화 품질과 추론 비용 사이 균형을 실제 long-form task에서 볼 필요가 있다.",
    ],
    question: "사용자 선호가 암묵적이거나 모순될 때 latent reasoning이 어떻게 갱신되는가?",
  },
  {
    id: "11330",
    title: "P-GenRM: Personalized Generative Reward Model with Test-Time User-Based Scaling",
    authors: ["Pinyi Zhang", "Ting-En Lin", "Yuchuan Wu", "Jingyang Chen", "Zongqi Wang", "Hua Yang", "Ze Xu", "Fei Huang", "Yongbin Li", "Kai Zhang"],
    session: "Oral Session 2",
    slot: "24th 15:15-16:45",
    presentation: "Oral",
    priority: "high",
    status: "todo",
    pdf: "papers/ICLR2026/Oral Session 2 (24th 1515-1645)/11330_P_GenRM_Personalized_Gen.pdf",
    source: "",
    tags: ["personalization", "reward model", "alignment"],
    summary:
      "개인별 선호를 평가 chain, persona, scoring rubric으로 구조화하고, 개별 사용자와 유사 사용자 prototype을 함께 활용해 test-time reward scaling을 수행하는 personalized generative reward model이다.",
    takeaways: [
      "고정된 평가 원칙 대신 사용자와 상황별 평가 rubric을 생성한다.",
      "user prototype을 통해 feedback이 적은 신규 사용자 일반화를 보강한다.",
      "test-time user-based scaling이 개인화 alignment 성능을 추가로 끌어올린다.",
    ],
    question: "사용자 prototype이 잘못 묶일 때 reward signal의 편향은 어떻게 제어되는가?",
  },
  {
    id: "15818",
    title: "Reasoning with Sampling: Your Base Model Is Smarter Than You Think",
    authors: ["Aayush Karan", "Yilun Du"],
    session: "Oral Session 2",
    slot: "24th 15:15-16:45",
    presentation: "Oral",
    priority: "high",
    status: "todo",
    pdf: "papers/ICLR2026/Oral Session 2 (24th 1515-1645)/15818_Reasoning_with_Sampling_.pdf",
    source: "",
    tags: ["reasoning", "sampling", "inference"],
    summary:
      "RL post-training 없이 base model의 likelihood만 활용하는 iterative sampling으로 reasoning 성능을 끌어내는 방법이다. MCMC에서 영감을 받은 sampling 절차로 학습 없이 여러 reasoning benchmark에서 큰 향상을 보인다.",
    takeaways: [
      "base model 내부에 이미 존재하는 reasoning 능력을 inference-time sampling으로 끌어낸다.",
      "RL post-training이 만드는 diversity collapse를 피하는 점을 강조한다.",
      "training, curated data, verifier 없이 적용 가능하다는 범용성이 핵심이다.",
    ],
    question: "sampling 비용이 커질 때 RL post-training 대비 실제 serving 효율은 어디서 역전되는가?",
  },
  {
    id: "22452",
    title: "LoongRL: Reinforcement Learning for Advanced Reasoning over Long Contexts",
    authors: ["Siyuan Wang", "Gaokai Zhang", "Li Lyna Zhang", "Ning Shang", "Fan Yang", "Dongyao Chen", "Mao Yang"],
    session: "Oral Session 2",
    slot: "24th 15:15-16:45",
    presentation: "Oral",
    priority: "high",
    status: "todo",
    pdf: "papers/ICLR2026/Oral Session 2 (24th 1515-1645)/22452_LoongRL_Reinforcement_Le.pdf",
    source: "https://loongrl.github.io/",
    tags: ["long-context", "RL", "reasoning"],
    summary:
      "짧은 multi-hop QA를 UUID chain이 숨어 있는 고난도 장문맥 과제로 합성하고, RL로 plan-retrieve-reason-recheck 패턴을 유도하는 long-context reasoning 방법이다.",
    takeaways: [
      "KeyChain 데이터가 검색만으로 풀 수 없는 장문맥 reasoning task를 만든다.",
      "16K 학습에서 128K task로 일반화하는 length extrapolation을 강조한다.",
      "장문맥 retrieval과 reasoning을 하나의 RL 행동 패턴으로 묶는다.",
    ],
    question: "KeyChain 합성 난이도가 실제 문서 분석 task의 reasoning 난이도를 충분히 대표하는가?",
  },
  {
    id: "25302",
    title: "Q-RAG: Long Context Multi-Step Retrieval via Value-Based Embedder Training",
    authors: ["Artyom Sorokin", "Nazar Buzun", "Alexander Anokhin", "Egor Vedernikov", "Petr Anokhin", "Mikhail Burtsev", "Evgeny Burnaev"],
    session: "Oral Session 2",
    slot: "24th 15:15-16:45",
    presentation: "Oral",
    priority: "high",
    status: "todo",
    pdf: "papers/ICLR2026/Oral Session 2 (24th 1515-1645)/25302_Q_RAG_Long_Context_Multi.pdf",
    source: "https://github.com/griver/Q-RAG",
    tags: ["RAG", "retrieval", "long-context"],
    summary:
      "복잡한 질문에 필요한 multi-step retrieval을 small LLM fine-tuning 대신 embedder 자체를 RL로 학습해 해결하는 resource-efficient RAG 방법이다.",
    takeaways: [
      "multi-step retrieval의 행동을 embedder value learning 문제로 바꾼다.",
      "LLM retriever fine-tuning보다 비용이 낮고 큰 LLM 사용 제약을 줄인다.",
      "BabiLong과 RULER 같은 긴 문맥 benchmark에서 강한 성능을 보고한다.",
    ],
    question: "embedder에 학습된 retrieval policy가 domain shift나 noisy corpus에서도 안정적으로 작동하는가?",
  },
  {
    id: "6576",
    title: "Token-Importance Guided Direct Preference Optimization",
    authors: ["Ning Yang", "Hai Lin", "Yibo Liu", "Baoliang Tian", "Guoqing Liu", "Haijun Zhang"],
    session: "Oral Session 2",
    slot: "24th 15:15-16:45",
    presentation: "Oral",
    priority: "high",
    status: "todo",
    pdf: "papers/ICLR2026/Oral Session 2 (24th 1515-1645)/6576_Token_Importance_Guided_D.pdf",
    source: "https://github.com/gracefulning/TIDPO",
    tags: ["DPO", "alignment", "token importance"],
    summary:
      "DPO가 sequence-level preference만 다루는 한계를 보완하기 위해, token importance를 gradient attribution과 Gaussian prior로 추정하고 triplet loss로 선호 방향을 구조적으로 안내하는 alignment 방법이다.",
    takeaways: [
      "선호 판단에 결정적인 token을 더 정확하고 robust하게 가중한다.",
      "triplet loss로 preferred response에 가까워지고 rejected response에서 멀어지도록 유도한다.",
      "DPO 대비 안정성과 생성 다양성 개선을 목표로 한다.",
    ],
    question: "token importance가 긴 답변에서 semantic unit보다 표면 token에 과도하게 묶이지 않는가?",
  },
  {
    id: "11059",
    title: "Rethinking LLM Reasoning: From Explicit Trajectories to Latent Representations",
    authors: ["Cong Jiang", "Xiaofeng Zhang", "Fangzhi Zhu", "Xiaowei Chen", "Junxiong Zhu", "Zheng Zhang"],
    session: "Poster Session 2",
    slot: "24th 15:15-17:45",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 2 (24th 1515-1745)/11059_Rethinking_LLM_Reasoning.pdf",
    source: "https://github.com/MobiusDai/LRT",
    tags: ["reasoning", "latent representation", "efficiency"],
    summary:
      "긴 explicit reasoning trajectory를 매번 생성하는 대신, 경량 reasoning network가 compact latent vectors를 만들고 이를 LLM에 주입해 답을 생성하는 Latent Reasoning Tuning 프레임워크다.",
    takeaways: [
      "token-by-token reasoning chain 생성 비용을 latent representation으로 줄인다.",
      "single forward pass로 필요한 reasoning logic을 압축한다.",
      "efficient reasoning benchmark에서 기존 압축형 reasoning 방법보다 강한 성능을 보인다.",
    ],
    question: "latent reasoning이 해석 가능성과 오류 디버깅 가능성을 얼마나 잃는가?",
  },
  {
    id: "11583",
    title: "Actions as Language: Fine-Tuning VLMs into VLAs without Catastrophic Forgetting",
    authors: ["Asher J. Hancock", "Xindi Wu", "Lihan Zha", "Olga Russakovsky", "Anirudha Majumdar"],
    session: "Poster Session 2",
    slot: "24th 15:15-17:45",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 2 (24th 1515-1745)/11583_Actions_as_Language_Fine.pdf",
    source: "",
    tags: ["robotics", "VLA", "LoRA"],
    summary:
      "로봇 action을 자연어로 표현해 VLM pretraining distribution과 teleoperation data 사이의 mismatch를 줄이고, LoRA만으로 VLA를 학습해 VLM의 reasoning/multimodal 능력 망각을 완화한다.",
    takeaways: [
      "low-level action을 language representation으로 바꿔 데이터 레벨 정렬을 수행한다.",
      "VLM backbone을 크게 바꾸지 않고 LoRA fine-tuning으로 VLA를 만든다.",
      "실세계 로봇 실험과 VQA 평가로 generalist capability 보존을 확인한다.",
    ],
    question: "action을 언어화할 때 연속 제어의 미세한 동역학 정보가 얼마나 손실되는가?",
  },
  {
    id: "13900",
    title: "FSPO: Few-Shot Optimization of Synthetic Preferences Personalizes to Real Users",
    authors: ["Anikait Singh", "Sheryl Hsu", "Kyle Hsu", "Eric Mitchell", "Stefano Ermon", "Tatsunori Hashimoto", "Archit Sharma", "Chelsea Finn"],
    session: "Poster Session 2",
    slot: "24th 15:15-17:45",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 2 (24th 1515-1745)/13900_FSPO_Few_Shot_Optimizati.pdf",
    source: "",
    tags: ["personalization", "few-shot", "preference optimization"],
    summary:
      "LLM 개인화를 reward modeling의 meta-learning 문제로 재구성해, 소수의 labeled preferences만으로 사용자별 reward function을 빠르게 추론하는 FSPO 방법이다.",
    takeaways: [
      "few-shot preference examples로 개인화 reward를 in-context 추론한다.",
      "synthetic personalized preference data를 대규모로 만들되 다양성과 자기일관성을 중요 조건으로 둔다.",
      "실제 사용자 연구에서도 개인화 응답 win-rate 개선을 보고한다.",
    ],
    question: "synthetic preference에서 학습한 사용자 구조가 실제 사용자 다양성을 얼마나 충실히 반영하는가?",
  },
  {
    id: "18279",
    title: "RPM: Reasoning-Level Personalization for Black-Box Large Language Models",
    authors: ["Jieyong Kim", "Tongyoung Kim", "Soojin Yoon", "Jaehyung Kim", "Dongha Lee"],
    session: "Poster Session 2",
    slot: "24th 15:15-17:45",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 2 (24th 1515-1745)/18279_RPM_Reasoning_Level_Pers.pdf",
    source: "https://github.com/jieyong99/RPM",
    tags: ["personalization", "black-box LLM", "reasoning"],
    summary:
      "최종 응답만 맞추는 response-level personalization을 넘어, 사용자 행동 데이터에서 reasoning structure를 자동 발견하고 이를 black-box LLM inference에 활용하는 reasoning-level personalization 프레임워크다.",
    takeaways: [
      "사용자별 response-influential feature와 statistical factor를 구조화한다.",
      "개인화 reasoning path와 beneficial examples를 검색해 inference를 안내한다.",
      "개인화 성능과 해석 가능성을 동시에 높이는 방향을 제시한다.",
    ],
    question: "추론 경로가 사용자 선호를 설명하는지, 단순 correlation을 재포장하는지 어떻게 검증하는가?",
  },
  {
    id: "22311",
    title: "PAMDP: Interact to Persona Alignment via a Partially Observable Markov Decision Process",
    authors: ["Zhe Yang", "Yi Huang", "Si Chen", "Xiaoting Wu", "Jingyu Yao", "Junlan Feng"],
    session: "Poster Session 2",
    slot: "24th 15:15-17:45",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 2 (24th 1515-1745)/22311_PAMDP_Interact_to_Person.pdf",
    source: "",
    tags: ["persona alignment", "POMDP", "RL"],
    summary:
      "사용자 persona가 대화 중 동적으로 변하지만 assistant에게는 직접 관측되지 않는다는 관점에서 persona alignment를 POMDP로 정식화하고, latent action을 쓰는 dual-critic RL 프레임워크를 제안한다.",
    takeaways: [
      "개인화 alignment를 단발 응답이 아니라 interaction process로 본다.",
      "사용자 profile을 unobservable state로 두어 부분관측 의사결정 문제로 정식화한다.",
      "offline dataset과 online simulator에서 persona alignment 개선을 평가한다.",
    ],
    question: "POMDP의 latent user profile이 실제 대화에서 얼마나 빠르고 안정적으로 식별되는가?",
  },
  {
    id: "8006",
    title: "Guided Speculative Inference for Efficient Test-Time Alignment of LLMs",
    authors: ["Jonathan Geuter", "Youssef Mroueh", "David Alvarez-Melis"],
    session: "Poster Session 2",
    slot: "24th 15:15-17:45",
    presentation: "Poster",
    priority: "medium",
    status: "todo",
    pdf: "papers/ICLR2026/Poster Session 2 (24th 1515-1745)/8006_Guided_Speculative_Infere.pdf",
    source: "",
    tags: ["test-time alignment", "speculative decoding", "reward model"],
    summary:
      "작은 auxiliary model의 speculative samples와 reward model을 결합해 soft best-of-n의 reward-guided decoding을 더 빠르게 근사하는 Guided Speculative Inference 방법이다.",
    takeaways: [
      "base model의 reward-tilted policy와 expected reward를 근사하는 이론적 틀을 제시한다.",
      "작은 모델 샘플을 활용해 reward-guided decoding의 latency를 줄인다.",
      "reasoning benchmark에서 accuracy와 end-to-end latency 개선을 함께 보고한다.",
    ],
    question: "auxiliary model의 분포가 base model과 멀어질 때 reward-guided 근사의 품질은 어떻게 변하는가?",
  },
  {
    id: "neurips2025-any-stepsize-gd",
    title: "Any-stepsize Gradient Descent for Separable Data under Fenchel-Young Losses",
    authors: ["Han Bao", "Shinsaku Sakaue", "Yuki Takezawa"],
    collection: "NeurIPS 2025",
    venue: "NeurIPS 2025",
    year: "2025",
    session: "Example Collection",
    slot: "Spotlight",
    type: "Spotlight",
    priority: "high",
    pdf: "",
    source: "https://oist.mlds.jp/2025/09/21/four-papers-accepted-by-neurips-2025/",
    tags: ["optimization", "gradient descent", "theory", "Fenchel-Young losses"],
    summary:
      "A theory-focused NeurIPS 2025 example entry about gradient descent behavior under Fenchel-Young losses for separable data. It is included as a sample item for the expandable conference-library interface.",
    takeaways: [
      "Use this card to test how spotlight papers appear in a non-ICLR collection.",
      "The topic cluster is optimization theory rather than agents or long-context memory.",
      "The source link points to a public accepted-paper announcement.",
    ],
    question: "Which step-size regimes make the result practically relevant for modern large-scale training?",
  },
  {
    id: "neurips2025-frame-shield",
    title: "FrameShield: Adversarially Robust Video Anomaly Detection",
    authors: ["Mojtaba Nafez", "Mobina Poulaei", "Nikan Vasei", "Bardia", "Mohammad Sabokrou", "Mohammad Hossein Rohban"],
    collection: "NeurIPS 2025",
    venue: "NeurIPS 2025",
    year: "2025",
    session: "Example Collection",
    slot: "Poster",
    type: "Poster",
    priority: "medium",
    pdf: "",
    source: "https://oist.mlds.jp/2025/09/21/four-papers-accepted-by-neurips-2025/",
    tags: ["video", "anomaly detection", "robustness", "adversarial"],
    summary:
      "A NeurIPS 2025 sample card for robust video anomaly detection. It broadens the library beyond language-model papers and checks that applied vision/security topics render cleanly.",
    takeaways: [
      "Represents a video and robustness paper inside the same library system.",
      "Useful for testing topic filters with non-LLM research.",
      "The detail page can later be replaced with a generated PDF-based summary.",
    ],
    question: "How does the robustness mechanism trade off sensitivity to subtle real anomalies?",
  },
  {
    id: "neurips2025-conformal-information-pursuit",
    title: "Conformal Information Pursuit for Interactively Guiding Large Language Models",
    authors: ["Kwan Ho Ryan Chan", "Yuyan Ge", "Edgar Dobriban", "Hamed Hassani", "Rene Vidal"],
    collection: "NeurIPS 2025",
    venue: "NeurIPS 2025",
    year: "2025",
    session: "Example Collection",
    slot: "Poster",
    type: "Poster",
    priority: "medium",
    pdf: "",
    source: "https://asset.seas.upenn.edu/neurips-2025/",
    tags: ["LLM", "conformal prediction", "interactive systems", "uncertainty"],
    summary:
      "A sample NeurIPS 2025 library item connecting uncertainty methods with interactive LLM guidance. It is useful as a future template for AI automation and decision-support papers.",
    takeaways: [
      "Shows how the library can hold LLM-adjacent statistical methodology papers.",
      "Pairs naturally with automation workflows that need uncertainty-aware interaction.",
      "The source entry is a public NeurIPS 2025 accepted-paper list.",
    ],
    question: "Can conformal guidance make interactive LLM systems more reliable without slowing the user loop?",
  },
];

window.PAPER_DETAILS = {
  "11163": {
    keywords: ["LLM Memory", "Long Context", "RL Agent"],
    abstractKo:
      "길이 외삽, 효율적 attention, memory module이 발전했지만 성능 저하 없이 사실상 무한히 긴 문서를 처리하는 일은 여전히 어렵다. 이 논문은 텍스트를 세그먼트 단위로 읽고 overwrite 전략으로 메모리를 갱신하는 MemAgent 워크플로를 제안하며, DAPO를 확장해 메모리 능력을 end-to-end로 직접 최적화한다. 실험은 짧은 학습 길이에서 훨씬 긴 문맥으로 확장되는 장기 문맥 처리 능력을 보여준다.",
    problem:
      "긴 문맥 LLM은 입력 길이가 늘어날수록 중요한 정보를 유지하고 갱신하는 능력이 약해지며, 단순 길이 확장만으로는 무한히 긴 문서 처리에 대응하기 어렵다.",
    objective:
      "LLM이 긴 문서를 순차적으로 읽으면서 필요한 정보만 메모리에 보존하고, 이후 질의에 안정적으로 활용할 수 있는 memory-agent 학습 방식을 만드는 것이다.",
    keyIdea:
      "문서를 작은 세그먼트로 나누어 읽고, 매 단계에서 기존 메모리를 overwrite하도록 하며, 이 메모리 갱신 정책 자체를 RL로 최적화한다.",
    contribution:
      "장기 문맥 문제를 attention 확장 문제가 아니라 memory management 문제로 재정의하고, MemAgent와 RL 기반 학습 절차를 통해 길이 외삽 성능을 개선한다.",
  },
  "11338": {
    keywords: ["Parametric Memory", "Retrieval", "RAG"],
    abstractKo:
      "LLM의 사실성과 지식 활용을 높이는 기존 방법은 RAG처럼 외부 지식을 유연하게 쓰지만 느린 방식과, LoRA처럼 파라미터에 지식을 넣지만 망각 위험이 있는 방식 사이의 trade-off를 가진다. MLP Memory는 kNN retriever의 동작을 모방하도록 사전학습된 경량 MLP 모듈을 붙여 명시적 문서 접근 없이 retrieval pattern을 파라미터화한다. 이를 통해 빠르고 미분 가능한 memory component로 지식 활용을 보강한다.",
    problem:
      "RAG는 추론 지연과 얕은 통합 문제가 있고, 파인튜닝 기반 지식 주입은 catastrophic forgetting과 일반 능력 저하를 일으킬 수 있다.",
    objective:
      "외부 문서 검색 없이도 retrieval-like behavior를 모델 내부에서 빠르게 사용할 수 있는 경량 메모리 모듈을 만드는 것이다.",
    keyIdea:
      "전체 pretraining dataset 위에서 kNN retriever의 출력을 MLP가 모방하도록 학습한 뒤, decoder와 확률적으로 결합해 parametric memory처럼 사용한다.",
    contribution:
      "검색기의 행동을 MLP 모듈로 내재화하는 retriever-pretrained memory를 제안해 RAG와 PEFT 사이의 속도, 지식 활용, 망각 trade-off를 완화한다.",
  },
  "1717": {
    keywords: ["Robotics", "VLA", "Memory"],
    abstractKo:
      "로봇 조작은 본질적으로 비마르코프적이며 시간적 맥락이 중요하지만, 기존 VLA 모델은 이를 충분히 활용하지 못해 장기 과제에서 약점을 보인다. MemoryVLA는 인지과학에서의 working memory와 장기 episodic/semantic memory 구분에서 영감을 받아, 관찰을 perceptual/cognitive 표현으로 저장하고 장기 조작을 지원하는 Cognition-Memory-Action 프레임워크를 제안한다. 이를 통해 시간 의존적인 로봇 조작에서 과거 경험을 더 안정적으로 활용한다.",
    problem:
      "기존 VLA 모델은 현재 관찰에 치우쳐 장기 조작에서 필요한 과거 상태, 진행 맥락, 이전 행동의 결과를 충분히 유지하지 못한다.",
    objective:
      "로봇이 장기 조작 과정에서 단기 작업 기억과 장기 경험 기억을 함께 사용하도록 하는 memory-aware VLA 구조를 설계하는 것이다.",
    keyIdea:
      "VLM이 관찰을 인지적 표현으로 인코딩하고, working memory와 perceptual-cognitive memory bank가 현재 제어와 과거 경험 검색을 함께 지원한다.",
    contribution:
      "인지과학적 memory 구분을 VLA 모델에 결합해 long-horizon robotic manipulation에서 시간 맥락을 구조적으로 다루는 프레임워크를 제시한다.",
  },
  "18334": {
    keywords: ["Reasoning", "Instruction Following", "Model Merging"],
    abstractKo:
      "Large reasoning model은 긴 추론에는 강하지만 출력 형식, 제약, 세부 요구사항 같은 instruction following에서는 자주 실패한다. 이 논문은 instruction-tuned model과 reasoning model의 task vector를 분석해 주요 subspace가 거의 직교한다는 점을 보이고, 이를 이용해 reasoning format을 보존하면서 instruction following을 강화하는 gradient-free merging 방법 RAIN-Merging을 제안한다.",
    problem:
      "LRM은 chain-of-thought 추론 능력은 뛰어나지만 사용자가 요구한 형식이나 제약을 지키는 능력이 instruction-tuned model보다 약하다.",
    objective:
      "추론 모델의 thinking format과 reasoning 능력을 유지하면서 instruction following 능력을 강화하는 병합 방법을 만드는 것이다.",
    keyIdea:
      "LRM과 ITM의 task vector subspace가 거의 직교한다는 관찰을 이용해, null-space projection과 instruction-attention scaling으로 간섭을 줄여 병합한다.",
    contribution:
      "추가 gradient 학습 없이 reasoning model과 instruction-tuned model의 장점을 결합하는 RAIN-Merging을 제안하고 format 보존형 alignment 가능성을 보인다.",
  },
  "1991": {
    keywords: ["Autonomous Driving", "Adversarial", "Preference Alignment"],
    abstractKo:
      "자율주행 시스템의 안전성 평가에서 adversarial scenario generation은 비용 효율적이지만, 기존 방법은 adversariality와 realism 같은 목표 사이의 고정된 trade-off에 묶여 있다. SAGE는 이 문제를 multi-objective preference alignment로 재구성하고, 재학습 없이 test time에 adversariality와 realism의 비율을 세밀하게 조절할 수 있게 한다.",
    problem:
      "기존 adversarial scenario generator는 특정 목적 균형에 고정되어 다양한 테스트 요구에 맞춰 시나리오를 즉석에서 조절하기 어렵다.",
    objective:
      "자율주행 테스트 시점에 realism과 adversariality 사이의 선호를 유연하게 조절할 수 있는 steerable generator를 만드는 것이다.",
    keyIdea:
      "선호 expert와 preference alignment를 사용해 여러 목적의 trade-off를 test time에 조절하고, hierarchical group-based preference modeling으로 제어성을 높인다.",
    contribution:
      "adversarial scenario generation을 preference alignment 문제로 재정의하고, 재학습 없이 세밀한 objective steering이 가능한 SAGE 프레임워크를 제안한다.",
  },
  "23970": {
    keywords: ["Alignment", "Logit Calibration", "Test-Time"],
    abstractKo:
      "LLM을 인간 선호에 맞추려면 보통 비싼 학습이나 복잡한 reward architecture가 필요하다. PALC는 hidden space를 직접 조작하지 않고, hidden state를 읽기 전용 context로 사용해 vocabulary logit space에서 calibration vector를 적용한다. 이를 통해 적은 파라미터로 test-time preference alignment를 수행하고 hidden representation 개입의 부작용을 줄인다.",
    problem:
      "기존 preference alignment는 비용이 크고, hidden representation을 직접 조작하는 steering은 feature superposition 때문에 예기치 않은 부작용을 만들 수 있다.",
    objective:
      "학습 비용을 줄이면서도 test time에 선호 방향으로 출력을 조정할 수 있는 안정적 alignment 방법을 만드는 것이다.",
    keyIdea:
      "hidden state는 context로만 읽고, bottleneck module이 위치별 calibration vector를 만들어 vocabulary logit에 직접 더한다.",
    contribution:
      "logit space 개입이라는 단순하고 해석 가능한 test-time alignment 방식을 제안해 효율성과 안정성 사이의 대안을 제시한다.",
  },
  "24355": {
    keywords: ["Long Context", "Test-Time Learning", "LoRA"],
    abstractKo:
      "장문맥 추론은 길고 잡음이 많은 입력에서 관련 정보를 정확히 찾아내야 한다. PERK는 테스트 시점의 gradient update로 긴 문맥을 LoRA adapter에 인코딩하는 parameter-efficient reasoning 방법이다. meta-training에서 inner loop는 문맥을 빠르게 adapter에 저장하고, outer loop는 업데이트된 adapter를 활용해 관련 정보를 회상하고 추론하도록 학습한다.",
    problem:
      "긴 입력에는 distractor 정보가 많고 위치 편향도 커서, 모델이 중간의 관련 정보를 찾아 복잡한 multi-hop 추론에 활용하기 어렵다.",
    objective:
      "긴 문맥을 추론 시점에 효율적으로 압축하고 저장해, 작은 모델도 긴 문맥 정보를 안정적으로 회상하고 추론하도록 하는 것이다.",
    keyIdea:
      "긴 문맥을 여러 짧은 segment로 처리하고, gradient-based test-time update를 통해 LoRA adapter를 임시 parametric memory처럼 사용한다.",
    contribution:
      "long-context reasoning을 test-time learning 문제로 재정의하고, LoRA 기반 메모리 업데이트로 여러 장문맥 과제에서 성능 향상을 보인다.",
  },
  "6247": {
    keywords: ["Procedural Memory", "Token", "Continual Adaptation"],
    abstractKo:
      "LLM은 보통 prompt로 제어되지만, 같은 절차를 매번 다시 처리해야 하고 모듈식 재사용이 어렵다. TokMem은 재사용 가능한 작업 절차를 하나의 trainable memory token으로 컴파일하는 procedural memory 프레임워크다. 각 token은 절차 index이자 generation control signal로 작동하며, backbone LLM은 고정한 채 새로운 절차를 계속 추가할 수 있다.",
    problem:
      "프롬프트 기반 절차 지식은 반복 처리 비용이 크고, 여러 task procedure를 모듈식으로 저장하거나 계속 추가하기 어렵다.",
    objective:
      "재사용 가능한 절차를 작은 단위로 저장하고, frozen LLM에서도 절차별 행동을 효율적으로 호출할 수 있게 하는 것이다.",
    keyIdea:
      "각 절차를 하나의 trainable memory token으로 학습해, 해당 token이 절차 선택과 생성 제어 신호를 동시에 담당하게 한다.",
    contribution:
      "procedural knowledge를 단일 token 단위로 저장하는 TokMem을 제안해 constant-size overhead와 continual procedure addition 가능성을 보인다.",
  },
  "746": {
    keywords: ["Verification", "Reward Model", "Reasoning"],
    abstractKo:
      "OpenAI o1, DeepSeek-R1 같은 대형 reasoning model은 reference-based reward system을 포함한 RL 학습으로 강한 추론 능력을 보인다. 하지만 기존 reward benchmark는 주로 두 응답의 선호 비교에 집중해, 정답 reference에 비추어 출력을 검증하는 능력을 평가하기 어렵다. VerifyBench와 VerifyBench-Hard는 reference-based reward system을 평가하기 위한 벤치마크로, 현재 verifier들이 어려운 사례에서 아직 큰 개선 여지가 있음을 보여준다.",
    problem:
      "reasoning model 학습에 쓰이는 reference-based verifier가 실제로 정답 기준 검증을 얼마나 잘하는지 평가할 표준 벤치마크가 부족하다.",
    objective:
      "ground-truth reference에 기반한 reward system의 검증 능력을 체계적으로 측정하는 benchmark를 구축하는 것이다.",
    keyIdea:
      "다양한 reasoning task에서 reference와 모델 출력을 수집, 정제, 인간 주석으로 검증해 표준 VerifyBench와 더 어려운 VerifyBench-Hard를 구성한다.",
    contribution:
      "preference comparison 중심 평가에서 벗어나 reference-based reward system 자체의 한계를 드러내는 벤치마크와 분석을 제공한다.",
  },
  "8572": {
    keywords: ["Personalization", "Reasoning", "Long-Form Generation"],
    abstractKo:
      "기존 preference alignment는 주로 집단 수준 선호에 맞춰져 개인 사용자의 암묵적 선호를 충분히 반영하지 못한다. 또한 think-then-generate 방식은 장문 생성 전체에 필요한 reasoning을 한 번에 만들어야 하므로 변화하는 문맥에 적응하기 어렵다. FlyThinker는 별도 reasoning model이 latent token-level reasoning을 생성과 병렬로 만들고 generation model에 주입하는 think-while-generating 프레임워크다.",
    problem:
      "개인화 장문 생성에서는 사용자의 선호와 생성 중 변화하는 문맥을 계속 반영해야 하지만, 기존 방식은 static one-shot reasoning에 의존한다.",
    objective:
      "장문 생성 중에도 개인화 reasoning을 동적으로 갱신하면서 효율적으로 응답을 생성하는 프레임워크를 만드는 것이다.",
    keyIdea:
      "reasoning model과 generation model을 분리하고, reasoning model이 latent token-level signal을 병렬 생성해 generation 과정에 지속적으로 주입한다.",
    contribution:
      "think-while-generating 패러다임을 제안해 개인화 long-form generation에서 reasoning과 generation의 동시 진행 가능성을 보인다.",
  },
  "11330": {
    keywords: ["Personalization", "Reward Model", "Alignment"],
    abstractKo:
      "LLM의 개인화 alignment는 사용자별 선호에 맞게 응답을 조정하려 하지만, open-ended scenario에서 정확한 사용자별 reward signal을 얻는 것이 어렵다. 기존 personalized reward model은 다양한 상황별 선호를 소수의 고정 평가 원칙으로 단순화하거나, feedback이 적은 신규 사용자에게 일반화하기 어렵다. P-GenRM은 선호 신호를 구조화된 evaluation chain으로 변환해 adaptive persona와 scoring rubric을 만들고, 사용자 prototype과 test-time user-based scaling을 통해 개인별 및 유사 사용자 수준의 선호를 함께 반영한다.",
    problem:
      "개인화 reward model은 사용자마다 달라지는 상황별 평가 기준을 충분히 표현하지 못하고, feedback이 적은 신규 사용자에게 약하다.",
    objective:
      "open-ended generation에서도 사용자별 선호를 더 정확히 평가하고, test time에 scalable하게 조정할 수 있는 generative reward model을 만드는 것이다.",
    keyIdea:
      "선호 데이터를 evaluation chain, persona, scoring rubric으로 구조화하고, 개별 사용자 scheme과 user prototype 정보를 dual-granularity로 scaling한다.",
    contribution:
      "P-GenRM을 통해 personalized reward modeling을 test-time user-based scaling 문제로 확장하고, 적은 feedback에서도 prototype transfer로 일반화를 개선한다.",
  },
  "15818": {
    keywords: ["Reasoning", "Sampling", "Inference"],
    abstractKo:
      "강력한 reasoning model은 주로 RL post-training으로 만들어지지만, RL 과정에서 정말 새로운 행동이 생기는지 아니면 base model에 이미 있던 능력을 끌어내는지에 대한 질문이 남아 있다. 이 논문은 추가 학습 없이 순수 sampling만으로 base model에서 유사한 reasoning 능력을 유도할 수 있는지 살핀다. MCMC에서 영감을 받은 iterative sampling algorithm은 base model의 likelihood를 활용해 sharpened distribution에서 샘플링하며, 여러 reasoning benchmark에서 RL에 근접하거나 능가하는 성능 향상을 보인다.",
    problem:
      "RL post-training이 reasoning 성능을 올리지만, 그 능력이 학습으로 새로 생기는지 inference-time 탐색으로도 끌어낼 수 있는지 불분명하다.",
    objective:
      "추가 학습, verifier, curated dataset 없이 base model의 내재 reasoning 능력을 sampling만으로 끌어내는 방법을 검증하는 것이다.",
    keyIdea:
      "MCMC식 sharpened distribution sampling에서 착안해, base model likelihood를 반복적으로 활용하는 simple iterative sampler를 적용한다.",
    contribution:
      "base model이 생각보다 강한 reasoning capability를 이미 갖고 있으며, 순수 inference-time sampling이 RL post-training과 경쟁할 수 있음을 보인다.",
  },
  "22452": {
    keywords: ["Long Context", "RL", "Reasoning"],
    abstractKo:
      "장문맥 reasoning은 긴 입력에서 정보를 검색하고 근거를 연결해야 하지만, 기존 RL reasoning 연구는 주로 짧은 문맥과 내부 지식 기반 문제에 집중했다. LoongRL은 short multi-hop QA를 UUID chain이 숨겨진 장문맥 task로 변환하는 KeyChain 합성 방식을 제안한다. 모델은 올바른 chain을 단계적으로 추적하고 진짜 질문과 관련 근거를 찾은 뒤 추론해야 하며, RL 학습을 통해 plan-retrieve-reason-recheck 패턴을 습득해 16K 학습에서 128K task로 일반화한다.",
    problem:
      "긴 문맥 task는 단순 retrieval뿐 아니라 관련 근거를 찾아 연결하는 reasoning이 필요하지만, 이를 유도할 고난도 RL 데이터와 학습 패턴이 부족하다.",
    objective:
      "장문맥에서 검색과 추론을 함께 수행하는 고급 reasoning pattern을 RL로 학습시키고, 긴 길이로 일반화하게 만드는 것이다.",
    keyIdea:
      "KeyChain이 UUID chain을 삽입해 distractor가 많은 장문맥 문제를 만들고, RL이 올바른 chain 추적과 recheck를 포함한 행동 패턴을 학습하게 한다.",
    contribution:
      "LoongRL은 장문맥 reasoning을 위한 합성 데이터와 RL training recipe를 제시하며, 긴 문맥 QA와 needle-in-a-haystack stress test에서 큰 개선을 보인다.",
  },
  "25302": {
    keywords: ["RAG", "Multi-Step Retrieval", "Embedder RL"],
    abstractKo:
      "RAG는 관련 context만 추려 LLM 입력을 줄이고 hallucination과 비용을 낮추지만, 대부분의 방법은 single-step retrieval에 머물러 복잡한 multi-step question을 풀기에 부족하다. 기존 multi-step retrieval은 small LLM을 fine-tuning하는 경우가 많아 비용이 크고 큰 LLM 활용을 제한한다. Q-RAG는 LLM 대신 embedder model을 RL로 학습해 multi-step retrieval을 수행하며, BabiLong과 RULER에서 10M token 규모의 long-context benchmark 성능을 개선한다.",
    problem:
      "복잡한 질문은 여러 단계의 탐색이 필요한데, single-step RAG는 충분하지 않고 LLM 기반 multi-step retriever 학습은 비용이 크다.",
    objective:
      "resource-efficient하게 multi-step retrieval을 수행하도록 embedder 자체를 학습해 장문맥 QA 성능을 높이는 것이다.",
    keyIdea:
      "retrieval 과정의 상태와 보상을 value-based RL 문제로 보고, embedder가 다음 검색 단계를 더 잘 선택하도록 fine-tuning한다.",
    contribution:
      "Q-RAG는 multi-step retrieval을 embedder training으로 옮겨 비용을 줄이고, 매우 긴 context benchmark에서 경쟁력 있는 성능을 제시한다.",
  },
  "6576": {
    keywords: ["DPO", "Token Importance", "Alignment"],
    abstractKo:
      "DPO는 preference alignment를 단순화했지만 데이터 noise에 민감하고 각 token의 중요도를 다르게 반영하지 못한다. 기존 token-level 방법은 확률 예측이나 단순 weighting에 의존해 token importance를 충분히 잡지 못한다. TI-DPO는 gradient attribution과 Gaussian prior를 결합한 hybrid weighting으로 token importance를 추정하고, triplet loss를 사용해 preferred response에 가까워지고 non-preferred response에서 멀어지도록 구조적 guidance를 제공한다.",
    problem:
      "sequence-level DPO는 선호에 실제로 중요한 token과 그렇지 않은 token을 구분하지 못해 noise와 sampling distribution shift에 취약하다.",
    objective:
      "token-level 중요도를 더 정확히 반영해 preference optimization의 안정성, 정확도, 생성 다양성을 높이는 것이다.",
    keyIdea:
      "gradient attribution과 Gaussian prior로 robust token weight를 만들고, triplet loss로 preferred/rejected response 사이의 방향성을 명시적으로 학습한다.",
    contribution:
      "TI-DPO는 token-importance guided preference optimization을 제안해 DPO류 alignment의 fine-grained semantic control을 강화한다.",
  },
  "11059": {
    keywords: ["Latent Reasoning", "Efficiency", "LLM"],
    abstractKo:
      "LLM은 복잡한 문제를 풀 때 step-by-step reasoning trajectory를 생성하지만, 그 길이가 최종 답보다 훨씬 길어 inference cost가 커진다. 이 논문은 완전한 token-by-token reasoning path 없이도 정확한 답을 만들 수 있음을 보이고, explicit textual trajectory 대신 compact learnable latent representation으로 reasoning하는 Latent Reasoning Tuning을 제안한다. 경량 reasoning network가 single forward pass로 latent vectors를 생성해 LLM이 최종 답을 내도록 조건화한다.",
    problem:
      "slow-thinking reasoning model은 간단한 문제에서도 긴 reasoning chain을 생성해 latency와 비용이 크게 증가한다.",
    objective:
      "명시적 reasoning trajectory 생성 비용을 줄이면서도 reasoning 성능을 유지하거나 개선하는 latent reasoning 방식을 만드는 것이다.",
    keyIdea:
      "경량 reasoning network가 질문에서 latent reasoning vectors를 한 번에 만들고, LLM은 이 latent representation을 조건으로 최종 답을 생성한다.",
    contribution:
      "LRT는 explicit reasoning을 latent reasoning으로 대체해 효율적 reasoning의 새로운 설계를 제안하고, 여러 benchmark에서 기존 efficient reasoning 방법을 능가한다.",
  },
  "11583": {
    keywords: ["VLA", "Robotics", "LoRA"],
    abstractKo:
      "VLM을 robot teleoperation data로 fine-tuning해 VLA model을 만드는 방식은 유망하지만, action prediction을 학습하는 과정에서 VLM의 reasoning과 multimodal understanding 능력이 손상되는 catastrophic forgetting이 발생한다. VLM2VLA는 이 문제가 internet-scale VLM pretraining corpus와 robotics data 사이의 distribution mismatch에서 온다고 보고, low-level action을 자연어로 표현해 데이터 수준에서 mismatch를 줄인다. 그 결과 LoRA만으로 VLA를 학습하면서 VLM backbone의 핵심 능력을 보존한다.",
    problem:
      "로봇 action을 직접 학습시키면 VLM의 기존 semantic reasoning, instruction following, multimodal understanding 능력이 망각될 수 있다.",
    objective:
      "VLM의 foundation capability를 보존하면서 robot teleoperation data를 이용해 generalist VLA policy를 학습하는 것이다.",
    keyIdea:
      "low-level robot action을 natural language description으로 바꿔 VLM의 pretraining distribution과 맞추고, LoRA로 최소한의 adapter만 학습한다.",
    contribution:
      "VLM2VLA는 actions-as-language 표현을 통해 catastrophic forgetting을 줄이고, 실제 로봇 실험에서 zero-shot generalization과 multilingual instruction following을 보인다.",
  },
  "13900": {
    keywords: ["Personalization", "Few-Shot", "Preference Optimization"],
    abstractKo:
      "LLM 개인화는 virtual assistant와 content curation 같은 사용자 대면 응용에서 중요하지만, 기존 preference optimization은 전체 사용자 선호를 평균화해 minority viewpoint나 개인별 차이를 놓칠 수 있다. FSPO는 reward modeling을 meta-learning 문제로 재구성해, LLM이 몇 개의 labeled preference만으로 사용자별 reward function을 빠르게 추론하도록 한다. 또한 User Description Rationalization을 활용하고, 공개 LLM으로 만든 100만 개 이상의 synthetic personalized preference를 통해 실제 사용자로의 transfer를 노린다.",
    problem:
      "집단 평균 선호에 맞춘 alignment는 개인의 가치, 배경, 상황별 선호를 반영하지 못하고 실제 open-ended QA 개인화가 어렵다.",
    objective:
      "소수의 사용자 선호 예시만으로 새로운 사용자에게 빠르게 적응하는 personalized LLM optimization 방법을 만드는 것이다.",
    keyIdea:
      "reward modeling을 meta-learning으로 보고, few-shot preference examples와 rationalized user description을 통해 사용자별 reward를 in-context로 추론한다.",
    contribution:
      "FSPO는 synthetic preference data를 활용한 few-shot personalization 방법을 제시하고, synthetic 및 real user 평가에서 개인화 응답 품질을 개선한다.",
  },
  "18279": {
    keywords: ["Personalization", "Black-Box LLM", "Reasoning"],
    abstractKo:
      "black-box LLM은 널리 쓰이지만 개별 사용자 선호를 놓친 generic output을 생성하기 쉽다. 기존 개인화 방법은 최종 응답만 맞추는 response-level personalization에 머물러, 사용자 행동이 응답으로 이어지는 reasoning 구조를 모델링하지 못한다. RPM은 reasoning-level personalization을 제안하고, raw behavioral data에서 사용자별 reasoning structure를 자동 발견해 personalized reasoning path와 beneficial examples를 구성함으로써 black-box LLM inference를 안내한다.",
    problem:
      "black-box LLM 개인화는 파라미터 접근 없이 최종 응답 패턴만 맞추는 경우가 많아, 왜 특정 응답이 사용자에게 맞는지 설명하기 어렵다.",
    objective:
      "사용자 행동 데이터에서 응답을 좌우하는 reasoning structure를 찾아, 개인화 성능과 해석 가능성을 함께 높이는 것이다.",
    keyIdea:
      "response-influential feature와 statistical factor로 사용자 행동 모델을 만들고, feature-based retrieval로 reasoning path와 예시를 선택해 inference에 넣는다.",
    contribution:
      "RPM은 response-level을 넘어 reasoning-level personalization이라는 새 관점을 제시하고, black-box setting에서 성능과 interpretability를 동시에 개선한다.",
  },
  "22311": {
    keywords: ["Persona Alignment", "POMDP", "RL"],
    abstractKo:
      "persona LLM에서 사용자의 미묘한 차이를 이해하고 선호에 적응하는 interaction process는 일반적인 human value alignment보다 실제 대화 동역학에 가깝다. 이 논문은 Interact to Persona Alignment 문제를 Persona Alignment MDP, 즉 PAMDP로 정식화하며, 상호작용 중 변화하는 사용자 profile을 assistant가 직접 관측할 수 없는 hidden variable로 본다. 이를 바탕으로 assistant utterance를 continuous latent action으로 표현하는 dual-critic RL framework를 제안한다.",
    problem:
      "사용자 선호는 이질적이고 대화 중 변하지만, 일반 RLHF식 단일 reward model은 이런 동적 persona alignment를 충분히 포착하지 못한다.",
    objective:
      "대화를 통해 사용자 profile을 점진적으로 추론하고, 그에 맞춰 persona-aligned response를 생성하는 의사결정 프레임워크를 만드는 것이다.",
    keyIdea:
      "사용자 profile을 부분관측 hidden state로 두고, assistant의 발화를 continuous latent action으로 모델링한 뒤 dual-critic RL로 policy를 학습한다.",
    contribution:
      "PAMDP는 persona alignment를 POMDP로 재정의해, interaction을 통한 개인화 alignment를 이론적/알고리즘적으로 다룬다.",
  },
  "8006": {
    keywords: ["Speculative Decoding", "Test-Time Alignment", "Reward Model"],
    abstractKo:
      "GSI는 LLM의 reward-guided decoding을 효율화하기 위한 Guided Speculative Inference 알고리즘이다. soft best-of-n test-time scaling, reward model, 작은 auxiliary model의 speculative samples를 결합해 base model 아래의 optimal tilted policy와 expected reward를 근사한다. reasoning benchmark에서 standard soft best-of-n 및 reward-guided speculative decoding보다 높은 정확도를 보이고, 일부 설정에서는 base model soft best-of-n도 능가하면서 end-to-end latency를 최대 28% 줄인다.",
    problem:
      "test-time scaling과 reward-guided decoding은 성능을 높일 수 있지만, 많은 샘플과 큰 모델 호출이 필요해 비용과 latency가 커진다.",
    objective:
      "reward-guided test-time alignment의 품질을 유지하거나 높이면서 decoding latency를 줄이는 것이다.",
    keyIdea:
      "작은 auxiliary model이 speculative samples를 만들고, reward model과 soft best-of-n 이론을 이용해 base model의 reward-tilted policy를 효율적으로 근사한다.",
    contribution:
      "GSI는 speculative decoding과 reward-guided sampling을 결합한 이론적/실험적 프레임워크로, reasoning benchmark에서 정확도와 속도를 동시에 개선한다.",
  },
  "neurips2025-any-stepsize-gd": {
    keywords: ["Optimization", "Theory", "Gradient Descent"],
    abstractKo:
      "이 항목은 NeurIPS 2025 예시 컬렉션을 위한 seed entry이다. 제목과 공개 accepted-paper 공지를 기준으로 볼 때, separable data와 Fenchel-Young loss 조건에서 gradient descent의 step-size 동작을 이론적으로 분석하는 논문으로 정리할 수 있다.",
    problem:
      "분리 가능한 데이터에서 gradient descent의 step-size 선택이 수렴과 암묵적 편향에 어떤 영향을 주는지 명확히 이해하기 어렵다.",
    objective:
      "Fenchel-Young loss 아래에서 다양한 step-size 설정을 포괄하는 gradient descent 이론을 제시하는 것이다.",
    keyIdea:
      "특정 작은 step-size 가정에만 묶이지 않고, 더 넓은 step-size 조건에서 separable data의 최적화 경로를 분석한다.",
    contribution:
      "NeurIPS 2025 컬렉션 확장 예시로, 최적화 이론 계열 논문이 상세 페이지에 어떻게 표현되는지 보여준다.",
  },
  "neurips2025-frame-shield": {
    keywords: ["Video", "Robustness", "Anomaly Detection"],
    abstractKo:
      "이 항목은 NeurIPS 2025 예시 컬렉션을 위한 seed entry이다. 제목과 공개 accepted-paper 공지를 기준으로, 비디오 이상 탐지 모델이 adversarial perturbation에도 안정적으로 동작하도록 만드는 robust anomaly detection 연구로 정리할 수 있다.",
    problem:
      "비디오 이상 탐지는 작은 교란이나 공격적 입력 변화에 민감할 수 있어 실제 안전 감시 환경에서 신뢰성이 떨어질 수 있다.",
    objective:
      "adversarial condition에서도 이상 프레임이나 사건을 안정적으로 탐지하는 비디오 anomaly detection 방법을 만드는 것이다.",
    keyIdea:
      "프레임 수준의 취약성을 줄이는 방어적 표현 또는 학습 절차를 사용해 공격적 변화에 대한 탐지 안정성을 높인다.",
    contribution:
      "언어 모델 중심 컬렉션을 넘어 video robustness 연구도 같은 상세 페이지 구조로 정리할 수 있음을 보여주는 예시 항목이다.",
  },
  "neurips2025-conformal-information-pursuit": {
    keywords: ["LLM", "Uncertainty", "Conformal Prediction"],
    abstractKo:
      "이 항목은 NeurIPS 2025 예시 컬렉션을 위한 seed entry이다. 공개 accepted-paper 목록과 제목을 기준으로, conformal prediction 계열의 불확실성 제어를 활용해 LLM을 상호작용적으로 안내하는 방법으로 정리할 수 있다.",
    problem:
      "상호작용형 LLM 시스템은 어느 정보가 충분한지, 어떤 질문을 더 해야 하는지에 대한 불확실성을 명시적으로 다루기 어렵다.",
    objective:
      "conformal uncertainty 신호를 활용해 LLM이 사용자와의 상호작용에서 더 정보성 높은 방향으로 진행하도록 안내하는 것이다.",
    keyIdea:
      "모델의 불확실성과 정보 획득 가치를 추정해 다음 질의나 응답 방향을 선택하는 interactive guidance 절차를 구성한다.",
    contribution:
      "LLM 자동화 시스템에 uncertainty-aware interaction을 결합할 수 있는 연구 축을 예시 컬렉션에 추가한다.",
  },
};

window.PAPER_LIBRARY = window.ICLR_PAPERS;
