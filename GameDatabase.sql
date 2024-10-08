USE [GameDatabase]
GO
/****** Object:  Table [dbo].[Tbl_Enemy]    Script Date: 26.09.2024 15:23:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Enemy](
	[EnemyId] [int] IDENTITY(1,1) NOT NULL,
	[EnemyName] [varchar](20) NULL,
	[EnemyLevel] [int] NULL,
	[EnemyAttackMin] [int] NULL,
	[EnemyAttackMax] [int] NULL,
	[EnemyHealth] [int] NULL,
	[EnemyImagePath] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Hero]    Script Date: 26.09.2024 15:23:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Hero](
	[HeroId] [int] IDENTITY(1,1) NOT NULL,
	[HeroName] [varchar](20) NOT NULL,
	[HeroAttackMin] [int] NULL,
	[HeroAttackMax] [int] NULL,
	[HeroDefenceMin] [int] NULL,
	[HeroDefenceMax] [int] NULL,
	[HeroPotMin] [int] NULL,
	[HeroPotMax] [int] NULL,
	[HeroHealth] [int] NULL,
	[HeroLevel] [int] NULL,
	[HeroImagePath] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_HeroTemplate]    Script Date: 26.09.2024 15:23:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_HeroTemplate](
	[HTId] [int] IDENTITY(1,1) NOT NULL,
	[HTName] [varchar](20) NULL,
	[HTAttackMin] [int] NULL,
	[HTAttackMax] [int] NULL,
	[HTDefenceMin] [int] NULL,
	[HTDefenceMax] [int] NULL,
	[HTPotMin] [int] NULL,
	[HTPotMax] [int] NULL,
	[HTHealth] [int] NULL,
	[HTLevel] [int] NULL,
	[HTImagePath] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tbl_Level]    Script Date: 26.09.2024 15:23:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tbl_Level](
	[LevelId] [int] IDENTITY(1,1) NOT NULL,
	[LevelNumber] [int] NULL,
	[HeroStatMultiplier] [float] NULL
) ON [PRIMARY]
GO
